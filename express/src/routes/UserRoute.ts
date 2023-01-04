import { Router, Request, Response, json, query, NextFunction } from "express";
import { myDataSource } from "../app-data-source"
import { User } from "../entity/user";
import { body, validationResult, CustomValidator, param, check} from 'express-validator';
import {Session} from 'express-session'; declare module 'express-session' { interface Session { user: {firstName: string, lastName: string, email: string, cover_background: string, profile_background: string}; } }
require("dotenv").config();

const cloudinary = require("cloudinary").v2



const rootRouter = Router();
const argon2 = require('argon2');


const isValidUser: CustomValidator = async value =>{
    return await myDataSource.getRepository(User).findOneBy({
        email: value
    }).then(user => {
        if (user){
            return Promise.reject('Provided Email Already Exists')
        }
    })
}


// register routes


rootRouter.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        email: req.params.id
    })

    if (results === null){
        return res.json(null)
    }

    else{
        return res.json(results)
    }

})

rootRouter.get("/login", check('username').exists({checkFalsy: true}), check('password').exists({checkFalsy: true}),
                async function (req: Request, res: Response){ // Set up express validation here, but set it up in the front too..


    const errors = validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()){
            return res.json({ errors: errors.array() });
        }

        

    const results = await myDataSource.getRepository(User).findOneBy({
            email: req.query.username as string,
    })


    if(results === null || await argon2.verify(results.password, req.query.password) === false){
    // Login failed.
    res.json(null);
    return
    }

    else if(results === null || req.query.password === '' || req.query.username === ''){
        res.json(null)
        return
    }

  else {
        
        if(req.session){

            req.session.user = {
                firstName: results.firstName,
                lastName: results.lastName,
                email: results.email, 
                cover_background: results.cover_background,
                profile_background: results.profile_background
            }

        }

        console.log(req.session.user)



        res.json(req.session.user);

  }


})



rootRouter.post("/users",  body('email', 'Invalid Email Provided').isEmail().custom(isValidUser),(body('firstName').exists({checkFalsy: true})),
                           body('lastName').exists({checkFalsy: true}).matches(/^[a-zA-Z]+$/),body('password').isLength({min:8, max: 15})
                           .exists({checkFalsy:true, checkNull:true})
                           .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/), 

    async function (req: Request, res: Response) { // A router that Sign's the user up

    // Check if the provided email meets email formatting requirments

        const errors = validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()){
            return res.send({ errors: errors.array() });
        }
        
        

        const hash: string = await argon2.hash(req.body.password)

        const user = await myDataSource.getRepository(User).create(

            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash, 
                email: req.body.email

            })
            
        const results = await myDataSource.getRepository(User).save(user)

        const cookieUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            email: req.body.email,
            cover_background: results.cover_background,
            profile_background: results.profile_background
        }

        if(req.session){
            req.session.user = cookieUser
        }




        return res.send(results)

         
})



rootRouter.get("/users", async function (req: Request, res: Response){

    if(req.session.user){
        res.send({loggedIn: true, firstName: req.session.user.firstName, lastName: req.session.user.lastName, 
                  email: req.session.user.email, cover_background: req.session.user.cover_background, profile_background: req.session.user.profile_background})
    }

    else{
        res.send({loggedIn: false})
    }


})


rootRouter.get("/user", async function (req: Request, res:Response){

    
    const results = await myDataSource.getRepository(User).findOneBy({
        email: req.body.email,
})


    res.json(results)


})

rootRouter.get("/logout", async function (req: Request, res: Response) {

    console.log(req.session)

    req.session.user = null

    req.session.destroy((err) => {
        if (err){
            console.log(err, "fired")
        }
    })
    


    return res.redirect('/')


    })



rootRouter.put("/users", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        email: req.body.email
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)

    // Update the cookie information... 

    req.session.user.firstName = results.firstName
    req.session.user.lastName = results.lastName

    return res.send(results)
})

rootRouter.put("/change", async function (req: Request, res : Response, next: NextFunction){

    console.log(req.body, "req")

    const user = await myDataSource.getRepository(User).findOneBy({
        email: req.body.email
    }) // Reterive user

    console.log(user)


    try{

    if ((await argon2.verify(user.password, req.body.oldPassword) === false)){
        throw new Error('Something went wrong..')

    }

    else if(req.body.newPassword !== req.body.password){
        res.json({error: "Provided Passwords Don't Match"})
        return
    }

    else{

        req.body.password = await argon2.hash(req.body.password)
    
        myDataSource.getRepository(User).merge(user, req.body)
        const results = await myDataSource.getRepository(User).save(user)

        res.json({validation: "Success"})

        return


    }

    } catch(err){
        next(err)
        res.status(404).send({error: err})
       
    }


})

rootRouter.delete("/delete/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)



    return res.send(results)
})

export {rootRouter as router}; 



rootRouter.post("/upload/cover", async function (req: Request, res: Response) {

    const fileEncoded: string = req.body.imageStringBase64
    const uploadedImageType: string = req.body.imageType // contains the type of image that is being uploaded to cloudinary

    console.log(fileEncoded)

    const uploadedResponse = await cloudinary.uploader.upload(fileEncoded, {
        resource_type: "image"
    })

    const user = await myDataSource.getRepository(User).findOneBy({
        email: req.body.email
    })

    if (uploadedImageType === "coverImage") {

        user.cover_background = uploadedResponse.public_id
        req.session.user.cover_background = uploadedResponse.public_id

    }

    else{
        user.profile_background = uploadedResponse.public_id
        req.session.user.profile_background = uploadedResponse.public_id

    }

    const results = await myDataSource.getRepository(User).save(user)



    console.log(uploadedResponse)

    res.json({"background": uploadedResponse.public_id})

})

