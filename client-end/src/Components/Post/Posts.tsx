
import React, {useContext, useEffect ,useMemo, useState} from 'react'
import { PostContext, reaction } from '../Contexts/PostContext'
import { postStructure } from "../Contexts/PostContext"
import { deleteHeart, deleteLike, getAllPosts, likeHeart, likePost } from '../AxiosCommands/Post/AxiosPostCommands'
import { UserContext } from '../Contexts/UserContext'
import { cld } from '../utils/Cloudinary'
import { deletePost } from '../AxiosCommands/Post/AxiosPostCommands'
import PostModal from '../Home/PostModal'
import ViewReplies from '../Reply/ViewReply'
import ViewReactions from '../ViewReactions/ViewReactions'


import { AdvancedImage, lazyload } from '@cloudinary/react'
import moment from 'moment'
import ReactMarkDown from 'react-markdown'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Delete, Edit, Favorite, QuestionAnswer, ThumbUp, Visibility } from '@mui/icons-material'
import { IconButton } from '@mui/material'



export default function PostList(){

    const {state, dispatch} = useContext(PostContext)

    useEffect(() =>{
        async function findAllPosts(){

            await getAllPosts().then(posts => dispatch({type: 'allPosts', payload: posts}))
        }



        findAllPosts();

    }, [])



    return(

     
        <Posts post={state.post}/>

    )


}

type post = {
    post: postStructure[]
}


function Posts({post}: post){

    const {user} = useContext(UserContext)

    const {state, dispatch} = useContext(PostContext)


    function handleClick(event: React.FormEvent<HTMLButtonElement>){

        const post_index = parseInt(event.currentTarget.dataset.postId!)

        dispatch({type: 'edit', payload: state.post[post_index]})

        dispatch({type: 'body', payload:state.post[post_index].body})

        dispatch({type:'title', payload: state.post[post_index].title})
        
        dispatch({type: true, payload: true})

    }

    function handleViewComments(event: React.FormEvent<HTMLButtonElement>){


        const post = state.post[parseInt(event.currentTarget.dataset.postId!)] // Access the post element

        dispatch({type: 'viewReplies', payload: true})
        

        dispatch({type: 'currentPost', payload: post})
        

    }

    function handleViewReactions(event: React.FormEvent<HTMLButtonElement>){

        const post = state.post[parseInt(event.currentTarget.dataset.postId!)] // Access the post element

        console.log(post)

        dispatch({type: 'currentPost', payload: post})

        dispatch({type: 'viewReactions', payload: true})
    
    }




    async function handlePostDelete(event: React.FormEvent<HTMLButtonElement>){

        console.log(event.currentTarget.dataset.postId)

        const post_to_remove = state.post[parseInt(event.currentTarget.dataset.postId!)] // Access the post.. 

        await toast.promise(deletePost(post_to_remove.post_id), {
            pending: "Your post is being deleted..", 
            success: "Your post has been deleted",
            error: "Something has gone wrong..."
        })

        dispatch({type: 'deletePost', payload: post_to_remove})



    }

    async function handlePostLike(event: React.FormEvent<HTMLButtonElement>){
        
        // here need to check whether there is a heart to the post comitted by the user

        const post = state.post[parseInt(event.currentTarget.dataset.postId!)]

        const heartPost = post.reaction.find(reaction => reaction.hearts > 0 && reaction.user.id === user?.id)


        const obj = {user: user?.id, post: post.post_id, reaction: heartPost?.id}

        if(heartPost){ // The user has liked the post

            await deleteHeart(heartPost.id).then(result => dispatch({type: "decrementHeart", payload: heartPost}))

        }


        await likePost(obj).then( result => dispatch({type: 'addLikeReaction', payload: result})).catch(err => console.log(err))

        dispatch({type: 'incrementLike', payload: post})

    }

    async function handlePostHeart(event: React.FormEvent<HTMLButtonElement>){

        // here need to check whether there is a like to the post comitted by the user...

        const post = state.post[parseInt(event.currentTarget.dataset.postId!)]

        const likedPost = post.reaction.find(reaction => reaction.likes > 0 && reaction.user.id === user?.id)

        const obj = {user: user?.id, post: post.post_id, reaction: likedPost?.id}


        if(likedPost){ // The user has liked the post

            await deleteLike(likedPost.id).then(result => dispatch({type: "decrementLike", payload: likedPost}))

        }

        const result = await likeHeart(obj)

        dispatch({type: 'incrementHeart', payload: post})

        dispatch({type: 'addHeartReaction', payload: result})

       

    }

    async function handlePostLikeRemove(event: React.FormEvent<HTMLButtonElement>){

    
        const post = state.post[parseInt(event.currentTarget.dataset.postId!)]

        const likedPost = post.reaction.find(reaction => reaction.likes > 0 && reaction.user.id === user?.id)


        if(likedPost){
                
            await deleteLike(likedPost.id).then(result => dispatch({type: "decrementLike", payload: likedPost!}))

        }


    }


    
    async function handlePostHeartRemove(event: React.FormEvent<HTMLButtonElement>){

        
        const post = state.post[parseInt(event.currentTarget.dataset.postId!)]

        const heartPost = post.reaction.find(reaction => reaction.hearts > 0 && reaction.user.id === user?.id)

        
        if (heartPost){
            await deleteHeart(heartPost.id).then(result => dispatch({type: "decrementHeart", payload: heartPost}))
        }





    }

    return useMemo(() => {

    
    return (

            
            <div className='d-flex flex-column other-post-container p-5'>

            {post.length && 


            post.map((element: postStructure, index: number) =>


           <div key={element.post_id} className='d-flex flex-column brr-post p-3'>

                <div className='d-flex align-items-top justify-content-between user-information'>

                    <div className='d-flex'>

                        <div className='d-flex align-items-center'>

                            <AdvancedImage key={element.user?.email} cldImg={cld.image(element.user?.profile_background)} className = 'user-profile-pic-post-style' 
                                            plugins={[lazyload({rootMargin: '0px',
                                            threshold: 0.25})]} />

                        </div>

                 
                        <div className='d-flex flex-column p-3'>

                            <div className='d-flex'>

                                <h1 className='display-6'>Post Title:{element.title}</h1>

                            </div>

                            <div className='d-flex user-information'>

                                <p className='text-muted'><b>{element.user?.firstName}, {element.user?.lastName}</b></p> 

                                <p className='text-muted'>{moment(element.createdAt).local().format('YYYY-MM-DD HH:mm:ss')}</p>

                            </div>

                        </div>


                </div>

                    <div>
                        
                        <div className='d-flex post-title'>

                            <div className='d-flex edit-button'>

                                
                                <IconButton color='secondary' data-post-id = {index} onClick={handleViewReactions}>
                                    <Visibility></Visibility>
                                    View all Reactions
                                </IconButton>

                                {user?.id === element.user?.id &&

                                    <div className='d-flex edit-delete-post-buttons'>

                                        <IconButton color = 'success' data-post-id = {index} disabled = {element.user?.id !== user?.id} onClick = {handleClick}>
                                            <Edit></Edit>
                                            Edit Post
                                        </IconButton>

                                        <IconButton color='error'data-post-id = {index} disabled = {element.user?.id !== user?.id} onClick = {handlePostDelete}>
                                            <Delete></Delete>
                                            Delete Post
                                        </IconButton>

                                    </div>          
                                
                                }

                            
                                </div>

                        </div>

                               
                   </div>


                </div>

                <div className='post-body-content'>

                    <div className='post-body-text'>

                        <ReactMarkDown children={element.body} />

                    </div>

                    <hr></hr>


                    <div className='d-flex flex-wrap post-images-container'>

                        {element.photo?.map((pic) => 

                        <AdvancedImage key={pic.photo_id} cldImg={cld.image(pic.photo_id)}  plugins={[lazyload({rootMargin: '0px',
                        threshold: 0.25})]}/>
                        
                        )}

                    </div>

                </div>


                <div className='d-flex justify-content-evenly p-2'>


                         
                    
                <IconButton data-post-id = {index} onClick = {handleViewComments}>
                        <QuestionAnswer></QuestionAnswer>
                         Comments({element.reply.length})
                    </IconButton>

                

                    {element.reaction.find(reaction => reaction.likes > 0 && reaction.user.id === user?.id) && element.likeCount > 0 ?

                    <IconButton color={'primary'} data-post-id = {index} onClick={handlePostLikeRemove}>
                        <ThumbUp></ThumbUp>
                        Like ({element.likeCount})
                        </IconButton>

                    :

                    
                    <IconButton data-post-id = {index} onClick={handlePostLike}>
                        <ThumbUp></ThumbUp>
                        Like ({element.likeCount})
                        </IconButton>
                        
                    }


                    {element.reaction.find(reaction => reaction.hearts > 0 && reaction.user.id === user?.id) && element.heartsCount > 0 ?

                    
                    <IconButton color='error' data-post-id = {index} onClick={handlePostHeartRemove}>
                        <Favorite></Favorite>
                        Heart ({element.heartsCount})
                    </IconButton>

                    :

                    
                  <IconButton  data-post-id = {index} onClick={handlePostHeart}>
                  <Favorite></Favorite>
                  Heart ({element.heartsCount})
              </IconButton>


                    
                
                    }

                
            

                </div>




        
            </div>

            
            
            )}

                        
            {state.edit && 
                                <PostModal /> 
                            }

                        
            {state.reply && 
                    
                    <ViewReplies /> 
                            
                        } 

            
            {state.viewReactions && 
                    <ViewReactions />
            }

         
                

        </div>


    )

    }, [state.post, state.edit, state.currentPost, state.reply])

  


}

