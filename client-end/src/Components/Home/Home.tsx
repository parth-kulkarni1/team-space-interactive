import './Home.css'
import { UserContext } from '../Contexts/UserContext'
import React, {useContext} from 'react'
import PostList from '../Post/Posts'
import { PostContext } from '../Contexts/PostContext'


import { cld } from '../utils/Cloudinary'
import { AdvancedImage } from '@cloudinary/react'
import { Button } from 'react-bootstrap'
import PostModal from './PostModal'


function Home(){

    const user = useContext(UserContext);

    const {dispatch} = useContext(PostContext)


    return(

        <div className="d-flex flex-column align-items-center page-container">

            <div className="d-flex align-items-center justify-content-around p-2 user-make-a-post">

                    <div className='d-flex align-items-center p-3 profile-pic'>

                        <AdvancedImage cldImg={cld.image(user.user?.profile_background as string)} className = "post-profile-pic"></AdvancedImage>
                    </div>

                    <Button type = "button" className='button-post' onClick={() => dispatch({type:true, payload: true})}>Make a new post, {user.user?.firstName}</Button>

            </div>

                    <PostModal />
                    
                    <PostList /> 
                





        </div>

       




    )
}



export default Home