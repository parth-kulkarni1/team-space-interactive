import { Router, Request, Response, json, query, NextFunction } from "express";
import { myDataSource } from "../app-data-source"
import { Post } from "../entity/Posts/post";
import { body, validationResult, CustomValidator, param, check} from 'express-validator';

const cloudinary = require("cloudinary").v2
const post_router = Router();

post_router.post('/post/create', body('title').exists({checkFalsy: true}), body('body').exists({checkFalsy: true}),
                body('user_id').exists({checkFalsy: true, checkNull: true})
                ,async function(req: Request, res: Response, next: NextFunction){

    try{

        const errors = validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()){
            return res.send({ errors: errors.array() });
        }
        
        const user = await myDataSource.getRepository(Post).create({
            title: req.body.title, 
            body: req.body.body,
            user: req.body.user_id 
        })

        await myDataSource.getRepository(Post).save(user)

        res.json({created: 'done'})

    } catch(err){
        next(err)
    }



})


post_router.get('/posts', async function(req: Request, res: Response, next: NextFunction){

    try{

        const results = await myDataSource.getRepository(Post).find()

        res.json(results)



    } catch(err){
        next(err)
    }


})



const rootRouter = Router();

export {post_router as Postrouter}