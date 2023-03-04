import React, {useState, useContext} from "react"
import './Reply.css'
import { PostContext } from "../Contexts/PostContext"
import { createReply } from "../AxiosCommands/Post/AxiosPostCommands"
import { UserContext } from "../Contexts/UserContext"



import { AddAPhoto, AddBox } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { Tooltip } from "@mui/material"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"

function Reply(){

    const {state, dispatch} = useContext(PostContext)

    const {user} = useContext(UserContext)

    const [image, setImage] = useState<string>('')

    const [hover, setHover] = useState<boolean>(false)

    const [reply, setReply] = useState<string>('')

 

    async function handleSubmitReply(event: React.FormEvent<HTMLButtonElement>){

            const replyObj = {reply: reply, post: state.currentPost.post_id, image: image, user: user?.id as number}

            await toast.promise(createReply(replyObj), {

                pending: "Your reply is uploading...",
                success: "Reply has been created",
                error: "Something has gone wrong.."


            }).then(result => dispatch({type: 'addReply', payload: result})).catch(err => console.log(err))

            setReply('')

            setHover(false)

            setImage('')

    
    }

    function handleImageReply(event: React.ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return
        }

        const uploaded_pic = event.target.files[0] // Select the first file that we want to preview 

        const reader = new FileReader()

        reader.readAsDataURL(uploaded_pic)

        reader.onloadend = () => {

            setImage(reader.result as string)
            
        }

    }


    return(
        <div className="d-flex flex-column text-area-container">

            <div className = "text-area">
                <textarea className="form-control" 
                          placeholder= {"Write a reply to " + state.currentPost.user?.firstName + " " + 
                                        state.currentPost.user?.lastName + "'s Post"}
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                                                    
                          ></textarea> 

                <div className="d-flex justify-content-between p-2">

                <p className="text-muted">Press Submit Button to upload your reply..</p>

                <p className="text-muted">{reply.length} / {150}</p>

                </div>


            </div>



            
            <div className="d-flex justify-content-end p-2 text-area-images">


                <Tooltip title="Add Photos">
                        <IconButton disabled={image.length > 0} component="label">
                            <input hidden type='file'
                                accept='image/*'
                                onChange={handleImageReply}></input>

                            <AddAPhoto></AddAPhoto>

                        </IconButton>

                    
                </Tooltip>
                    
                    
                    <Tooltip title="Submit Post">
                            <span>
                                <IconButton onClick={handleSubmitReply} disabled = {reply.length === 0 || reply.length > 150 }>
                                    <AddBox></AddBox>
                                </IconButton>
                            </span>     
                    </Tooltip>



            </div>

                

            <div className="d-flex reply-post-image">

            {image.length > 0 && 

                    <div onMouseEnter={() => setHover(true)} onMouseLeave = {() => setHover(false)}>

                        <div>

                            <img src = {image} alt = '' width={200} className = 'previewImageReply'></img>
                            
                        </div>

                        <div>

                            
                            {hover &&

                                <Button className="deleteImageReply" onClick = {() => setImage('')}>Delete Image</Button>
                            
                            
                            }

                        </div>

                    </div>

                    }

            </div>



        </div>
   
    
    )






}

export default Reply