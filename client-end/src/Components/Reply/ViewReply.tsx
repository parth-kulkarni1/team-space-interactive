import React, {useContext, useState, useMemo} from "react"
import { PostContext, reply } from "../Contexts/PostContext"
import './ViewReply.css'
import { UserContext } from "../Contexts/UserContext"
import { cld } from "../utils/Cloudinary"
import Reply from "./Reply"
import './Reply.css'
import CommentReply from "./CommentReply"
import { deleteReply } from "../AxiosCommands/Post/AxiosPostCommands"



import { Button, Modal, ModalBody } from "react-bootstrap"
import { AdvancedImage, lazyload } from "@cloudinary/react"
import moment from "moment"
import { toast } from "react-toastify"

function ViewReplies(){

    const {state,dispatch} = useContext(PostContext)

    console.log("triggering me heree")

   
   

    function handleClose(){
        const index = state.post.findIndex(post => post.post_id === state.currentPost.post_id) // find the index

        const array = state.post.filter(post => post.post_id !== state.currentPost.post_id) // Remove the reply

        array.splice(index, 0, state.currentPost)

        dispatch({type: 'allPosts', payload: array})

        dispatch({type: 'viewReplies', payload: false})

        

    }


    return(

        <div>
            <Modal size="lg" show = {state.reply} centered = {true} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>View Post Replies</Modal.Title>
                </Modal.Header>

                <ModalBody>

                    <Reply />

                </ModalBody>

                <ModalBody>

                <CommentReplyA reply={state.currentPost.reply}/>


                </ModalBody>

           
            </Modal>




        </div>


       
    

    )


}

type postReply = {
    reply: reply[]
}



function CommentReplyA({reply}: postReply){

    const {state, dispatch} = useContext(PostContext)
    const {user} = useContext(UserContext)

    const [activeReply, setActiveReply] = useState<string>('')

    async function handleDelete(reply: reply){

        await toast.promise(deleteReply(reply.id), {
            pending: "Your reply is being deleted...",
            success: "You reply has been deleted", 
            error: "Something has gone wrong..."
        })

        if(!reply.parentComment){ // This means that if its a parent comment then the deletion will be handled differently

            dispatch({type: 'deleteReplyParent', payload: reply})
        
        }

        else{ // Deletion for child comments

            dispatch({type: 'deleteReplyChild', payload: reply})


        }


    }

    return useMemo(() => {
    
    return(
            
        <div>

            {reply.map((reply) => 
            
            <div className="parent-comment">

                <div className="replies-container">

                    <div className="d-flex flex-column reply align-items-start">

                        <div className=" d-flex flex-column options">

                            <div className="d-flex flex-column user-information-reply p-3">

                                <div className="d-flex photo-info">

                                <div className="reply-owner-profile-pic">

                                    <AdvancedImage key={reply.user.id} cldImg={cld.image(reply.user.profile_background)}
                                                    className = 'user-profile-pic-post-style' 
                                                    plugins={[lazyload({rootMargin: '0px',
                                                    threshold: 0.25})]} />

                                </div>

                                <div className="d-flex reply-owner-information">

                                    <p>{reply.user.firstName} {reply.user.lastName}</p>

                                    <p>{moment(reply.createdAt).local().format('YYYY-MM-DD HH:mm:ss')}</p>

                                    
                                    {user?.id === reply.user.id ?

                                        <div>
                                            
                                            <Button variant="link" onClick={() => { setActiveReply(String(reply.id));dispatch({type: 'replyOwner', payload: reply})}}>Edit Reply</Button>
                                            <Button variant="link" onClick = {() => {handleDelete(reply)}}>Delete Reply</Button>
                                            <Button variant="link" disabled = {(!reply.childComments)} 
                                                    onClick={(event) => {setActiveReply(String(reply.id)); 
                                                                       ;}}
                                                                        >Reply</Button>

                                        </div>

                                        : 

                                        <div>

                                            <Button variant="link" disabled = {!reply.childComments} onClick={(event) => {
                                                                                        setActiveReply(String(reply.id)); 
                                                                                        ; }}
                                                                                        >Reply</Button>

                                        </div>

                                    }
                            
                                </div>

                                </div>

                                <div className="d-flex flex-column reply-body p-3">

                                    <p>{reply.body}</p>

                                    {reply.photo.map((image) => 

                                        <AdvancedImage key={image.photo_id} cldImg={cld.image(image.photo_id)} />
                            
                                    )}  

                                </div>


                            </div>

                            {String(reply.id) === activeReply && 
                                    <CommentReply key={reply.id}/>
                                }


                        </div>

                    </div>

                </div>

                    <hr></hr>


        

                    {reply.childComments && 
                    
                        <CommentReplyA key= {reply.id} reply={reply.childComments}/>               
                                
                    }

                            
            </div>
        
            )} 

            </div>

            
            

                
            )}, [activeReply, state.currentPost])}



    

export default ViewReplies

