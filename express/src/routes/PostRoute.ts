import { Router, Request, Response, json, query, NextFunction } from "express";
import { myDataSource } from "../app-data-source"
import { Post } from "../entity/Posts/post";
import { body, param, validationResult} from 'express-validator';
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
                width: 300,
                height: 300,
                crop: "fit",
                quality: "auto",
                fetch_format: "auto"


            })


            const images = await myDataSource.getRepository(photos).create({
                photo_id: uploadedResponse.public_id,
                post: saved_post
                
            })


            await myDataSource.getRepository(photos).save(images)

        }

        const results = await myDataSource.getRepository(Post).findOneBy({
            post_id: saved_post.post_id
        })

        res.json(results)

    } catch(err){
        console.log(err)
        next(err)
    }



})


post_router.get('/posts', async function(req: Request, res: Response, next: NextFunction){

    try{

        const results = await myDataSource.getRepository(Post).find() // Finds all entites with eager loading... inlcudes post, user and photo object

        res.json(results)



    } catch(err){
        next(err)
    }


})

post_router.put('/post/update', body('post.title').exists({checkFalsy: true}), body('post.body').exists({checkFalsy: true}),
async function(req: Request, res: Response, next: NextFunction){

    try{
        const errors = validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()){
        return res.send({ errors: errors.array() });
        }

        const post = await myDataSource.getRepository(Post).findOneBy({
            post_id: req.body.post.post_id
        })

        const obj = {title: req.body.post.title, body: req.body.post.body}

        myDataSource.getRepository(Post).merge(post, obj)

        const result = await myDataSource.getRepository(Post).save(post)

        await myDataSource.getRepository(Post).update(post.post_id, {createdAt: new Date()})

        if (req.body.imageHandling.deletedImages.length >= 1){

            for(let i = 0; i < req.body.imageHandling.deletedImages.length; i++){
                const image = await myDataSource.getRepository(photos).findOneBy({
                    photo_id: req.body.imageHandling.deletedImages[i]
                })

                await myDataSource.getRepository(photos).remove(image)
            }

        }

        if (req.body.imageHandling.localImages.length >=1){

            for(let i = 0; i < req.body.imageHandling.localImages.length; i++){

                
                const uploadedResponse = await cloudinary.uploader.upload(req.body.imageHandling.localImages[i], {
                    width: 300,
                    height: 300,
                    crop: "fit",
                    quality: "auto",
                    fetch_format: "auto"


                })

            


                const images = await myDataSource.getRepository(photos).create({
                    photo_id: uploadedResponse.public_id,
                    post: result
                    
                })


                await myDataSource.getRepository(photos).save(images)
                
                }

        }



        const apost = await myDataSource.getRepository(Post).findOneBy({
            post_id: req.body.post.post_id
        })
        

        res.json(apost)

        

    } catch(err){
        next(err)
    }


    })


post_router.delete('/post/delete/:id', param('id').exists(), async function(req: Request, res: Response, next: NextFunction){

    const errors = validationResult(req);
    console.log(errors)

    if (!errors.isEmpty()){
    return res.send({ errors: errors.array() });
    }


    try{

        const post = await myDataSource.getRepository(Post).delete(req.params.id) // This will cascade into deleting all images as well..

        res.sendStatus(200) // Post Successfully has been deleted


    }catch(err){
        next(err)
    }




})


const rootRouter = Router();

export {post_router as Postrouter}