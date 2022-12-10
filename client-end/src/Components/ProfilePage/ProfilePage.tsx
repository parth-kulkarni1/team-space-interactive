import React, {useState, useContext} from "react"
import { UserContext } from '../UserContext/UserContext';

function ProfilePage(){

    const userContext = useContext(UserContext);

    console.log(userContext?.user)


    return(
        <div>

            Hey

        </div>
    )


}


export default ProfilePage;