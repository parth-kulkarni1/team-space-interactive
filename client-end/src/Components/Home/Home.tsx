/* eslint-disable react/forbid-foreign-prop-types */
import './Home.css'
import { cld } from '../../utils/Cloudinary'
import { AdvancedImage } from '@cloudinary/react'
import { UserContext } from '../UserContext/UserContext'
import React, {useReducer, useContext, useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import MDEditor from '@uiw/react-md-editor'

const initalState: CurrentState = {
    show: false,
    value: ''
}

interface CurrentState{
    show: boolean
    value: string
}

type CurrentAction = {
   type: true | false | 'add'
   payload: string | boolean

  }


function reducer(state: CurrentState, action: CurrentAction): CurrentState{
    switch(action.type){
        case true:
        return {...state, show: action.payload as boolean}

        case false:
            return {...state, show: action.payload as boolean}

        case 'add':
            console.log(action.payload)
            return {...state, value: action.payload as string}
        
        default:
            return state

    
    }


}



function Home(){

    const user = useContext(UserContext);

    const [state, dispatch] = useReducer(reducer,initalState)

    return(

        <div className="page-container">

        <div className='d-flex'>

        <div className="list-user">
            this section is in development...
        </div>

        <div className="post-user">

            <div className='d-flex align-items-center user-make-a-post'>
                <div className='d-flex align-items-center p-3 profile-pic'>

                    <AdvancedImage cldImg={cld.image(user.user?.profile_background as string)} className = "post-profile-pic"></AdvancedImage>
                </div>

                <div className='modal-launch'>

                    <Button type = "button" className='button-post' onClick={() => dispatch({type:true, payload: true})}>Make a new post, {user.user?.firstName}</Button>

                    <Modal show = {state.show} centered = {true} onHide = {() => dispatch({type: false, payload: false})}>

                        <Modal.Header closeButton>
                            <Modal.Title>Make a post</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form>

                                <Form.Control type = "input" 
                                              placeholder='Write a title for your post...'></Form.Control>

                            </Form>

                            <br></br>

                            <MDEditor value={state.value} 
                                    onChange = {(value) => dispatch({type:'add', payload: value as string})}
                                    preview = "edit"
                                    ></MDEditor>
                        
                            <br></br>

                            <div className='d-flex justify-content-between'>
                                <Button>Add Images To Your Post..</Button>

                                <Button>Sumbit Post</Button>

                            </div>



                        </Modal.Body>

                    </Modal>

                </div>

            </div>

        </div>

        <div className="network-user">
            this section is in development...
        </div>

        </div>




        </div>



    )
}


export default Home