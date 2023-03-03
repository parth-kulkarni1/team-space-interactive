import React, {useState, useContext} from "react"
import { PostContext } from "../Contexts/PostContext"
import { cld } from "../utils/Cloudinary";

import { Modal, ModalHeader, ModalBody } from "react-bootstrap"
import { IconButton } from "@mui/material";
import { ThumbUp, Favorite, Groups } from "@mui/icons-material";
import { AdvancedImage } from "@cloudinary/react";

function ViewReactions(){

    const {state,dispatch} = useContext(PostContext);

    const [showAll, setAllView] = useState<boolean>(true);

    const [showHearts, setHeartsView] = useState<boolean>(false);

    const [showLikes, setLikesView] = useState<boolean>(false);


    function handleCloseModal(){

        dispatch({type: 'viewReactions', payload: false})

        setHeartsView(false)

        setLikesView(false)

        setAllView(false)

    }

    function handleLikes(){

        setAllView(false)

        setHeartsView(false)

        setLikesView(true)

    }

    function handleHeart(){

        setAllView(false)

        setLikesView(false)

        setHeartsView(true)

    }

    function handleAll(){

        setAllView(true)

        setLikesView(false)

        setHeartsView(false)

    }



    return(

    <Modal show = {state.viewReactions} centered = {true} onHide = {handleCloseModal}>

        <ModalHeader title="Reactions" closeButton></ModalHeader>

        <div className="d-flex justify-content-center align-items-center p-3">
        
            <IconButton onClick={handleAll}>
                <Groups color={showAll ? "primary" : "inherit"} fontSize="large"></Groups>    
            </IconButton>            

            <IconButton onClick={handleLikes} hidden = {state.currentPost.likeCount === 0}>
                <ThumbUp color={showLikes ? "primary" : "inherit"}></ThumbUp>
            </IconButton>

            <IconButton onClick={handleHeart} hidden = {state.currentPost.heartsCount === 0}>
                    <Favorite color= {showHearts ? "error" : "inherit"}></Favorite>
            </IconButton>
        
        </div>


        <hr></hr>



        {!showHearts && !showLikes &&

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
        
        }

        {showHearts &&
            
            <ModalBody>
            
            {state.currentPost.heartsCount === 0 ?
                <p>Be the first to heart this post...</p>    
            
            :

            state.currentPost.reaction.map((element) =>  

                <div>

                    {element.hearts > 0 &&

                    
                            <div className="d-flex align-items-center">

                                <AdvancedImage key={element.user.id} cldImg={cld.image(element.user.profile_background)} className = 'user-profile-pic-post-style'></AdvancedImage>                            

                                <p>{element.user.firstName} {element.user.lastName}</p> 

                            </div> 

                    }



                </div>

            )}


        </ModalBody>        
        
        }   


        {showLikes &&
            
            <ModalBody>
            
            {state.currentPost.likeCount === 0 ?
                <p>Be the first to like this post...</p>    
            
            :

            state.currentPost.reaction.map((element) =>  

                <div>

                    {element.likes > 0 &&

                        
                            <div className="d-flex align-items-center">

                                <AdvancedImage key={element.user.id} cldImg={cld.image(element.user.profile_background)} className = 'user-profile-pic-post-style'></AdvancedImage>                            

                                <p>{element.user.firstName} {element.user.lastName}</p> 

                            </div>

                    }



                </div>

            )}


        </ModalBody>        
        
        }   





    </Modal>


    )

}

export default ViewReactions