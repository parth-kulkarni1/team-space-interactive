
import React, {useContext, useEffect} from 'react'
import { PostContext } from '../Contexts/PostContext'
import { CurrentState } from '../Contexts/PostContext'
import { postStructure } from "../Contexts/PostContext"
import { getAllPosts } from '../AxiosCommands/Post/AxiosPostCommands'


import { cld } from '../utils/Cloudinary'
import { AdvancedImage } from '@cloudinary/react'
import moment from 'moment'
import ReactMarkDown from 'react-markdown'

export default function PostList(){

    const {state, dispatch} = useContext(PostContext)

    useEffect(() =>{
        async function findAllPosts(){

            await getAllPosts().then(posts => dispatch({type: 'allPosts', payload: posts}))

        }



        findAllPosts();

    }, [state.show, dispatch])



    return(

     
        <Posts post={state.post} ownPost={state.ownPost} show={false} errors={{
            title: '',
            body: ''
        }}/>

    )


}


function Posts({post}: CurrentState){

    function getTimeFromUTC(utc_string: string): Array<string>{

        const half  = utc_string.split('T')
        const time = half[1].split('.')



        return time

    }

    
    return (

            
            <div className='d-flex flex-column other-post-container'>
    

            {post.length && 


            post.slice().reverse().map((element: postStructure) =>


            <div key={element.post_id} className='d-flex flex-column brr-post p-3'>

                <div className='d-flex align-items-top user-information'>

                    <div className='d-flex user-profile-pic-post'>

                        <AdvancedImage cldImg={cld.image(element.user.profile_background)} className = 'user-profile-pic-post-style' lazy-loading></AdvancedImage>

                    </div>

                    <div>
                        
                        <div className='post-title'>

                        <p className='text-danger'><b>Post Title:{element.title}</b></p>

                        </div>

                        <div className='d-flex user-profile-post-information'>

                        <p><b>{element.user.firstName}, {element.user.lastName}</b></p> 
                        <p>{moment(element.createdAt).utc().format('YYYY-MM-DD')}</p>
                        <p>{getTimeFromUTC(element.createdAt)[0]}</p>

                        </div>
                   
                   
                   </div>


                </div>


                <div className='post-body-content'>

                    <div className='post-body-text'>

                        <ReactMarkDown children={element.body} />

                    </div>

                    <hr></hr>


                    <div className='d-flex flex-wrap post-images-container'>

                        {element.photo.map((pic) => 

                        <AdvancedImage cldImg={cld.image(pic.photo_id)} lazy-loading />
                        
                        )}

                    </div>




                </div>
                
            </div>


            
            
            )}



        </div>


    )






}

