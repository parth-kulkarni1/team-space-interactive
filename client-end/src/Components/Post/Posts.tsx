
import React, {useContext, useEffect ,useMemo} from 'react'
import { PostContext } from '../Contexts/PostContext'
import { postStructure } from "../Contexts/PostContext"
import { getAllPosts } from '../AxiosCommands/Post/AxiosPostCommands'
import { UserContext } from '../Contexts/UserContext'
import { cld } from '../utils/Cloudinary'
import { deletePost } from '../AxiosCommands/Post/AxiosPostCommands'
import PostModal from '../Home/PostModal'


import { AdvancedImage, lazyload } from '@cloudinary/react'
import moment from 'moment'
import ReactMarkDown from 'react-markdown'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import ViewReplies from '../Reply/ViewReply'



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

                            <div className='edit-button'>

                                {user?.email === element.user?.email &&

                                    <div className='d-flex edit-delete-post-buttons'>
                                        <Button data-post-id = {index} disabled = {element.user?.email !== user?.email} onClick = {handleClick}>Edit Post</Button>
                                        <Button data-post-id = {index} disabled = {element.user?.email !== user?.email} onClick = {handlePostDelete}>Delete Post</Button>
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


                <div className='d-flex justify-content-between p-2'>
                    
                    <Button variant="link" className="text-muted" data-post-id = {index} onClick = {handleViewComments} >View all commments ({element.reply.length})</Button>

                    <Button>Like Post</Button>

                </div>




        
            </div>

            
            
            )}

                        
            {state.edit && 
                                <PostModal /> 
                            }

                        
            {state.reply && 
                    
                    <ViewReplies /> 
                            
                        } 

         
                

        </div>


    )

    }, [state.post, state.edit, state.currentPost, state.reply])

  


}

