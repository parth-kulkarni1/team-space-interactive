import {useState, useContext} from "react"
import { PostContext } from "../Contexts/PostContext"

function ProfileView(){

    const {state, dispatch} = useContext(PostContext)

    const {user} = state.currentPost


    return(
        <div>
            {user?.firstName}
        </div>
    )


}

export default ProfileView