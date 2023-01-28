import { Router, Request, Response, json, query, NextFunction } from "express";
import { myDataSource } from "../app-data-source"
import { Post } from "../entity/Posts/post";
import { body, validationResult} from 'express-validator';
import { photos } from "../entity/Image/photos";
require("dotenv").config();


const cloudinary = require("cloudinary").v2
const post_router = Router();

post_router.post('/post/create', body('title').exists({checkFalsy: true}), body('body').exists({checkFalsy: true}),
                body('userId').exists({checkFalsy: true, checkNull: true})
                ,async function(req: Request, res: Response, next: NextFunction){

    try{

        const errors = validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()){
            return res.send({ errors: errors.array() });
        }

    
        const post = await myDataSource.getRepository(Post).create({
            title: req.body.title, 
            body: req.body.body,
            user: req.body.userId,
            
        })

        const saved_post = await myDataSource.getRepository(Post).save(post)

        for(let i = 0; i < req.body.images.length; i++){

            const uploadedResponse = await cloudinary.uploader.upload(req.body.images[i], {
                width: 500,
                height: 500,
                crop: "fit",
                quality: "auto",
                fetch_format: "auto"


            })

            cloudinary.image()

            const images = await myDataSource.getRepository(photos).create({
                photo_id: uploadedResponse.public_id,
                post: saved_post
                
            })


            await myDataSource.getRepository(photos).save(images)

        }


        res.json({created: 'done'})

    } catch(err){
        console.log(err)
        next(err)
    }



})


post_router.get('/posts', async function(req: Request, res: Response, next: NextFunction){

    try{

        const results = await myDataSource.getRepository(Post).find({
            relations : {
                user: true,
                photo: true
            }, 
            select: {
                user:{
                    firstName: true, 
                    lastName: true, 
                    email: true,
                    profile_background: true
                }, 
                photo: {
                    photo_id: true
                }
            }

        })





        res.json(results)



    } catch(err){
        next(err)
    }


})




const rootRouter = Router();

export {post_router as Postrouter}