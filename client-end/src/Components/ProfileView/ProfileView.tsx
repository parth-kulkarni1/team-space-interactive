import {useState, useContext} from "react"
import { PostContext } from "../Contexts/PostContext"
import { useParams } from "react-router-dom"
import { cld } from "../utils/Cloudinary"

import { AdvancedImage } from "@cloudinary/react"

function ProfileView(){

    const {state, dispatch} = useContext(PostContext)

    const {user} = state.currentPost

    const params = useParams();

    console.log(params)


    return(
        <div>

            <div className="d-flex justify-content-center bg-black text-white p-3">
                You are viewing {user?.firstName} {user?.lastName}'s profile

            </div>

            <div>
                <AdvancedImage cldImg={cld.image(user?.cover_background)} className = "cover-img" />
            </div>

            <div className="d-flex bg-primary align-items-top p-5 mt-5">

                <div>
                
                    <AdvancedImage cldImg={cld.image(user?.profile_background)}  className = "profile-pic mb-5" />
                
                </div>

                <div>
                    <p>{user?.firstName} {user?.lastName}</p>
                </div>
            
            </div>


            <div className="bg-black">
                View Posts
            </div>


            
        </div>
    )


}

export default ProfileView