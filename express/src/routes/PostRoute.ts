import { Router, Request, Response, json, query, NextFunction } from "express";
import { myDataSource } from "../app-data-source"
import { Post } from "../entity/Posts/post";
import { body, validationResult, CustomValidator, param, check} from 'express-validator';
import { User } from "../entity/User/user";

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

        await myDataSource.getRepository(Post).save(post)

        res.json({created: 'done'})

    } catch(err){
        next(err)
    }



})


post_router.get('/posts', async function(req: Request, res: Response, next: NextFunction){

    try{

        const results = await myDataSource.getRepository(Post).find({
            relations : {
                user: true
            }, 
            select: {
                user:{
                    firstName: true, 
                    lastName: true, 
                    email: true,
                    profile_background: true
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