import { Router, Request, Response, json, query, NextFunction } from "express";
import { myDataSource } from "../app-data-source"
import { Post } from "../entity/Posts/post";
import { body, param, validationResult} from 'express-validator';
import { photos } from "../entity/Image/photos";
import { Reply } from "../entity/Reply/reply";
import { User } from "../entity/User/user";
import { Reactions } from "../entity/Reactions/reaction";
import { selectFields } from "express-validator/src/select-fields";
import { getRepository } from "typeorm";
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

        const query = await myDataSource.getRepository(Post).createQueryBuilder("post").loadRelationCountAndMap("post.likeCount", "post.reaction.likes", "reaction", (qb) => qb.where('reaction.likes > 0'))
                                                            .loadRelationCountAndMap("post.heartsCount", "post.reaction.hearts", "reaction", (qb) => qb.where('reaction.hearts > 0'))
                                                            .leftJoin("post.user", "userpost")
                                                            .addSelect(['userpost.firstName', 'userpost.lastName',
                                                                        'userpost.cover_background', 
                                                                        'userpost.profile_background', 
                                                                        'userpost.email', 'userpost.id'])
                                                            .leftJoinAndSelect('post.reply', 'reply')
                                                            .leftJoin('reply.user', 'userreply').addSelect([
                                                                'userreply.firstName', 'userreply.lastName',
                                                                'userreply.cover_background', 
                                                                'userreply.profile_background', 
                                                                'userreply.email', 'userreply.id'
                                                            ]).leftJoinAndSelect('reply.photo', "replyphoto")
                                                            .leftJoinAndSelect("post.photo", "photo")
                                                            .leftJoinAndSelect("post.reaction", "reactions")
                                                            .leftJoinAndSelect("reactions.post", "postd")
                                                            .leftJoin("reactions.user", "user").addSelect(
                                                                ['user.firstName', 'user.lastName',
                                                                'user.cover_background', 
                                                                'user.profile_background', 
                                                                'user.email', 'user.id']).where("post.post_id =:id", {id: saved_post.post_id})
                                                                .getMany()

        res.json(query[0])


    } catch(err){
        console.log(err)
        next(err)
    }



})


post_router.get('/posts', async function(req: Request, res: Response, next: NextFunction){

    try{

        const found = await myDataSource.getRepository(Post).createQueryBuilder("post").loadRelationCountAndMap("post.likeCount", "post.reaction.likes", "reaction", (qb) => qb.where('reaction.likes > 0')).loadRelationCountAndMap("post.heartsCount", "post.reaction.hearts", "reaction", (qb) => qb.where('reaction.hearts > 0'))
        .leftJoinAndSelect("post.reaction", "reactions").leftJoin("reactions.user", "userx").addSelect(['userx.id', 'userx.firstName', 'userx.lastName', 'userx.profile_background', 'userx.cover_background', 'userx.email'])
        .leftJoinAndSelect("reactions.post", "postx").leftJoinAndSelect("post.reply", "reply").leftJoinAndSelect("reply.photo", "photoreply")
        .leftJoin("reply.user", "replyuser").addSelect(['replyuser.id', 'replyuser.cover_background', 'replyuser.profile_background', 'replyuser.firstName', 'replyuser.lastName'])
        .leftJoinAndSelect("reply.childComments", "replyChild1")
        .leftJoin("replyChild1.user", "userchild1").addSelect(['userchild1.id', 'userchild1.cover_background', 'userchild1.profile_background', 'userchild1.firstName', 'userchild1.lastName'])
        .leftJoinAndSelect("replyChild1.parentComment", "replychildparentComment1").leftJoinAndSelect("replyChild1.photo", "replyChildCommentphoto")
        .leftJoinAndSelect("replyChild1.childComments", "replyChild2").leftJoin("replyChild2.user", "replyChildComments2user").addSelect(['replyChildComments2user.id', 'replyChildComments2user.cover_background', 'replyChildComments2user.profile_background', 'replyChildComments2user.firstName', 'replyChildComments2user.lastName'])
        .leftJoinAndSelect("replyChild2.photo", "replyChildComments2photo").leftJoinAndSelect("post.photo", "photo").leftJoin("post.user", "user").addSelect(['user.id', 'user.cover_background', 'user.profile_background', 'user.firstName', 'user.lastName'])
        .getMany()


        res.json(found)



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


        const results = await myDataSource.getRepository(Post).find({
            relations: ['user', 'reply', 'reply.user', 'reply.photo', 'reply.childComments', 'reply.childComments.user', 'reply.childComments.parentComment',
                        'reply.childComments.photo', 'reply.childComments.childComments', 'reply.childComments.childComments.user', 'reply.childComments.childComments.photo', 'photo'
                      ], 
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
            },
            where: {
                post_id: req.body.post.post_id
            }

        })

        
        

        res.json(results[0])

        

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


post_router.post('/post/reaction/like', async function(req: Request, res: Response, next: NextFunction){

    const reaction = await myDataSource.getRepository(Reactions).create({
        post: req.body.post,
        user: req.body.user,
        likes: 1
    })

    const saved = await myDataSource.getRepository(Reactions).save(reaction)

    const post = await myDataSource.getRepository(Post).findOneBy({
        post_id: req.body.post
    })


    // Replace this with the query that finds using raw many and update the value accordignly

     const updated_reaction = await myDataSource.getRepository(Reactions).find({
        relations:{
            post: true, 
            user: true, 
        }, select: {
            user: {
                firstName: true, 
                lastName: true, 
                cover_background: true, 
                profile_background: true, 
                email: true,
                id: true
            }, 

            post: {
                post_id: true
            }
        } ,where: {
            id: saved.id
        }
     })

    res.json(updated_reaction[0])

})

post_router.post('/post/reaction/heart', async function(req: Request, res: Response, next: NextFunction){

    const reaction = await myDataSource.getRepository(Reactions).create({
        post: req.body.post,
        user: req.body.user,
        hearts: 1
    })

    const saved = await myDataSource.getRepository(Reactions).save(reaction)

    const post = await myDataSource.getRepository(Post).findOneBy({
        post_id: req.body.post
    })


    // Replace this with the query that finds using raw many and update the value accordignly

    const updated_reaction = await myDataSource.getRepository(Reactions).find({
        relations:{
            post: true, 
            user: true, 
        }, select: {
            user: {
                firstName: true, 
                lastName: true, 
                cover_background: true, 
                profile_background: true, 
                email: true,
                id: true
            }, 

            post: {
                post_id: true
            }
        } ,where: {
            id: saved.id
        }
     })

    res.json(updated_reaction[0])

})

post_router.delete('/post/reaction/like/remove/:id', async function (req: Request, res: Response, next: NextFunction){

    
    try{

        const reaction = await myDataSource.getRepository(Reactions).findOneBy({
            id: parseInt(req.params.id)
        })
        

        await myDataSource.getRepository(Reactions).remove(reaction) // Removes the reply entity cascadely... 

        res.sendStatus(200)

    }catch(err){
        next(err)
        res.sendStatus(500)
    }


})

post_router.delete('/post/reaction/hearts/remove/:id', async function (req: Request, res: Response, next: NextFunction){

    
    try{

        const reaction = await myDataSource.getRepository(Reactions).findOneBy({
            id: parseInt(req.params.id)
        })
        

        await myDataSource.getRepository(Reactions).remove(reaction) // Removes the reply entity cascadely... 

        res.sendStatus(200)

    }catch(err){
        next(err)
        res.sendStatus(500)
    }



})




const rootRouter = Router();

export {post_router as Postrouter}