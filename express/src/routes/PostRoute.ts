import { Router, Request, Response, json, query, NextFunction } from "express";
import { myDataSource } from "../app-data-source"
import { Post } from "../entity/Posts/post";
import { body, param, validationResult} from 'express-validator';
import { photos } from "../entity/Image/photos";
import { Reply } from "../entity/Reply/reply";
import { User } from "../entity/User/user";
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

        const results = await myDataSource.getRepository(Post).find({
            relations: ['user', 'reply', 'reply.user', 'reply.photo', 'photo'], 
            select: {
                reply: {
                    body: true, 
                    createdAt: true, 
                    updatedAt: true,
                    id: true,
                    user: {
                        firstName: true, 
                        lastName: true, 
                        cover_background: true, 
                        profile_background: true, 
                        email: true,
                        id: true
                    }
                }
            }, where:
                {post_id: saved_post.post_id}
                
            })


        res.json(results[0])


    } catch(err){
        console.log(err)
        next(err)
    }



})


post_router.get('/posts', async function(req: Request, res: Response, next: NextFunction){

    try{

        const results = await myDataSource.getRepository(Post).find({
            relations: ['user', 'reply', 'reply.user', 'reply.photo', 'reply.childComments', 'reply.childComments.user', 'reply.childComments.parentComment',
                        'reply.childComments.photo', 'reply.childComments.childComments', 'reply.childComments.childComments.user', 'reply.childComments.childComments.photo', 'photo'], 
            select: {
                reply: {
                    body: true, 
                    createdAt: true, 
                    updatedAt: true,
                    id: true,
                    user: {
                        firstName: true, 
                        lastName: true, 
                        cover_background: true, 
                        profile_background: true, 
                        email: true,
                        id: true
                    }, 
                    parentComment: {
                        body: true, 
                        createdAt: true, 
                        updatedAt: true
                    }
                    
                }
                
            } ,order: {
                post_id: "DESC",
                reply: {
                    id: "DESC"
                }
            }

        })



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

post_router.post('/post/reply/create', body("body").exists({checkFalsy: true, checkNull: true}).notEmpty(), body("postId").exists().notEmpty(),async function (req: Request, res: Response, next: NextFunction){


    try{

            const user = await myDataSource.getRepository(User).findOneBy({
                id: req.body.user
            })

            const reply = await myDataSource.getRepository(Reply).create({
                body: req.body.reply,
                postId: req.body.post,
                user: user
            })



            const savedReply = await myDataSource.getRepository(Reply).save(reply) // Save the reply instance

            if(req.body.image.length > 0) {

                const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
                    width: 150,
                    height: 150,
                    crop: "fit",
                    quality: "auto",
                    fetch_format: "auto"

                })

                    
                const reply_image = await myDataSource.getRepository(photos).create({
                    photo_id: uploadedResponse.public_id,
                    reply: savedReply, 
                })

                await myDataSource.getRepository(photos).save(reply_image)
            }

            const updatedReply = await myDataSource.getRepository(Reply).find({
                relations: {
                    photo: true,
                    user: true,
                    childComments: true
                }, 

                select: {
                    user: {
                        firstName: true, 
                        lastName: true, 
                        profile_background: true, 
                        cover_background: true, 
                        email: true, 
                        id: true

                    }, 

                    photo: {
                        photo_id: true
                    }
                }, where: {
                    id: savedReply.id
                }

            })

            


            res.json(updatedReply[0])



        } catch(err){
            next(err)
        }


    })

 post_router.post('/post/reply/reply', async function(req: Request, res: Response, next: NextFunction){

    const user = await myDataSource.getRepository(User).findOneBy({
        id: req.body.user
    })

    const reply = await myDataSource.getRepository(Reply).create({
        body: req.body.reply,
        parentComment: req.body.reply_id,
        user: user
    })

    const saved_reply = await myDataSource.getRepository(Reply).save(reply)


    if(req.body.image.length > 0){

        const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
            width: 150,
            height: 150,
            crop: "fit",
            quality: "auto",
            fetch_format: "auto"

        })

            
        const reply_image = await myDataSource.getRepository(photos).create({
            photo_id: uploadedResponse.public_id,
            reply: saved_reply, 
        })

        await myDataSource.getRepository(photos).save(reply_image)
    }



    const updatedReply = await myDataSource.getRepository(Reply).find({
        relations: ['user', 'photo', 'childComments', 'parentComment', 'parentComment.parentComment'],

        select: {
            user: {
                firstName: true, 
                lastName: true, 
                profile_background: true, 
                cover_background: true, 
                email: true, 
                id: true

            }, 

            photo: {
                photo_id: true
            }
        }, where: {
            id: saved_reply.id,
        }

    })


    if(updatedReply[0].parentComment.parentComment){ // This ensures that if the comment contains two parents so (original reply -> reply -> reply, its disbaled and cant be replied furhter)

        updatedReply.forEach(e => {delete e.childComments})
    }

    res.json(updatedReply[0])

 })   


 post_router.delete('/post/reply/delete/:id', async function (req: Request, res: Response, next: NextFunction){

    try{

        const reply = await myDataSource.getRepository(Reply).findOneBy({
            id: parseInt(req.params.id)
        })
        

        await myDataSource.getRepository(Reply).remove(reply) // Removes the reply entity cascadely... 

        res.sendStatus(200)

    }catch(err){
        next(err)
        res.sendStatus(500)
    }

    









 })


const rootRouter = Router();

export {post_router as Postrouter}