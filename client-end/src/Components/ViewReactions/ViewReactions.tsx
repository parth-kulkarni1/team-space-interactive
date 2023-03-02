import React, {useState, useContext} from "react"
import { PostContext } from "../Contexts/PostContext"
import { cld } from "../utils/Cloudinary";

import { Modal, ModalHeader, ModalBody } from "react-bootstrap"
import { IconButton } from "@mui/material";
import { ThumbUp, Favorite, Groups } from "@mui/icons-material";
import { AdvancedImage } from "@cloudinary/react";

function ViewReactions(){

    const {state,dispatch} = useContext(PostContext);

    const [showHearts, setHeartsView] = useState<boolean>(false);

    const [showLikes, setLikesView] = useState<boolean>(false);


    function handleCloseModal(){

        dispatch({type: 'viewReactions', payload: false})

        setHeartsView(false)

        setLikesView(false)

    }



    return(

    <Modal show = {state.viewReactions} centered = {true} onHide = {handleCloseModal}>

        <ModalHeader closeButton></ModalHeader>

        <div className="d-flex justify-content-center align-items-center p-3">
        
            <IconButton>
                <Groups color={state.viewReactions ? "primary" : "inherit"} fontSize="large"></Groups>    
            </IconButton>            

            <IconButton onClick={() => setHeartsView(false)}>
                <ThumbUp color={showLikes ? "primary" : "inherit"}></ThumbUp>
            </IconButton>

            <IconButton onClick={() => setHeartsView(true)}>
                    <Favorite color= {showHearts ? "error" : "inherit"}></Favorite>
            </IconButton>
        
        </div>


        <hr></hr>



        {!showHearts && !showLikes ?

            <ModalBody>

                                            
                {state.currentPost.likeCount === 0 && state.currentPost.heartsCount === 0 ?

                <p>Be the first to react to this post..</p>
                
                :

                state.currentPost.reaction.map((element) =>  

                    <div>

                            <div className="d-flex align-items-center">

                                <AdvancedImage key={element.user.id} cldImg={cld.image(element.user.profile_background)} className = 'user-profile-pic-post-style'></AdvancedImage>                            

                                <p>{element.user.firstName} {element.user.lastName}</p> 

                            </div>

                    </div>
                            
                )}


            </ModalBody>
        
        : 

            
            <ModalBody>
            
            {state.currentPost.heartsCount === 0 ?
                <p>Be the first to heart this post...</p>    
            
            :

            state.currentPost.reaction.map((element) =>  

                <div>

                    {element.hearts > 0 &&

                    <p> {element.user.firstName} </p> 

                    }



                </div>

            )}


        </ModalBody>        
        
        }   




    </Modal>


    )

}

export default ViewReactions