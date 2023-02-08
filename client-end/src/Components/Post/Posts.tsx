
import React, {useContext, useEffect} from 'react'
import { PostContext } from '../Contexts/PostContext'
import { CurrentState } from '../Contexts/PostContext'
import { postStructure } from "../Contexts/PostContext"
import { getAllPosts } from '../AxiosCommands/Post/AxiosPostCommands'
import { UserContext } from '../Contexts/UserContext'
import { cld } from '../utils/Cloudinary'
import { deletePost } from '../AxiosCommands/Post/AxiosPostCommands'
import PostModal from '../Home/PostModal'
import Reply from '../Reply/Reply'

import { AdvancedImage, lazyload } from '@cloudinary/react'
import moment from 'moment'
import ReactMarkDown from 'react-markdown'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'


export default function PostList(){

    const {state, dispatch} = useContext(PostContext)

    useEffect(() =>{
        async function findAllPosts(){

            await getAllPosts().then(posts => dispatch({type: 'allPosts', payload: posts}))
        }



        findAllPosts();

    }, [])



    return(

     
        <Posts post={state.post} ownPost={state.ownPost} show={false} errors={{
            title: '',
            body: ''
        }} edit={{
            status: false,
            post: {
                title: '',
                body: '',
                post_id: 0,
                createdAt: '',
                photo: [],
            }, 
            imageHandling: {
                deletedImages: [],
                localImages: []
            }
        }}/>

    )


}


function Posts({post}: CurrentState){

    const {user} = useContext(UserContext)

    const {state, dispatch} = useContext(PostContext)

    function getTimeFromUTC(utc_string: string): Array<string>{

        const half  = utc_string.split('T')
        const time = half[1].split('.')



        return time

    }

    function handleClick(event: React.FormEvent<HTMLButtonElement>){

        dispatch({type: 'edit', payload: state.post[parseInt(event.currentTarget.id)]})

        dispatch({type: 'body', payload:state.post[parseInt(event.currentTarget.id)].body})

        dispatch({type:'title', payload: state.post[parseInt(event.currentTarget.id)].title})
        
        dispatch({type: true, payload: true})

    }

    async function handlePostDelete(event: React.FormEvent<HTMLButtonElement>){

        const post_to_remove = state.post[parseInt(event.currentTarget.id)] // Access the post.. 

        await toast.promise(deletePost(post_to_remove.post_id), {
            pending: "Your post is being deleted..", 
            success: "Your post has been deleted",
            error: "Something has gone wrong..."
        })

        dispatch({type: 'deletePost', payload: post_to_remove})



    }
    
    return (

            
            <div className='d-flex flex-column other-post-container p-5'>

            {post.length && 


            post.map((element: postStructure, index: number) =>


           <div key={element.post_id} className='d-flex flex-column brr-post p-3'>

                <div className='d-flex align-items-top justify-content-between user-information'>

                    <div className='d-flex'>

                        <div className='d-flex align-items-center'>

                            <AdvancedImage cldImg={cld.image(element.user?.profile_background)} className = 'user-profile-pic-post-style' 
                                            plugins={[lazyload({rootMargin: '0px',
                                            threshold: 0.25})]} />

                        </div>

                 
                        <div className='d-flex flex-column p-3'>

                            <div className='d-flex'>

                                <h1 className='display-6'>Post Title:{element.title}</h1>

                            </div>

                            <div className='d-flex user-information'>

                                <p className='text-muted'><b>{element.user?.firstName}, {element.user?.lastName}</b></p> 

                                <p className='text-muted'>{moment(element.createdAt).utc().format('YYYY-MM-DD')}</p>

                                <p className='text-muted'>{getTimeFromUTC(element.createdAt)[0]}</p>

                            </div>

                        </div>


                </div>

                    <div>
                        
                        <div className='d-flex post-title'>

                            <div className='edit-button'>

                                {user?.email === element.user?.email &&

                                    <div className='d-flex edit-delete-post-buttons'>
                                        <Button id = {String(index)} disabled = {element.user?.email !== user?.email} onClick = {handleClick}>Edit Post</Button>
                                        <Button id = {String(index)} disabled = {element.user?.email !== user?.email} onClick = {handlePostDelete}>Delete Post</Button>
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

                        <AdvancedImage cldImg={cld.image(pic.photo_id)}  plugins={[lazyload({rootMargin: '0px',
                        threshold: 0.25})]}/>
                        
                        )}

                    </div>


                </div>

        

                <Reply></Reply>


            
                
            </div>

            
            
            )}

                        
            {state.edit && 
                                <PostModal /> 
                            }

        </div>


    )






}

