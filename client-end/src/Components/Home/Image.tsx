import React, {useRef, useContext, useState} from 'react'
import './Image.css'
import { imageType, PostContext } from '../Contexts/PostContext'


import { Button } from 'react-bootstrap'
import { AdvancedImage } from '@cloudinary/react'
import { cld } from '../utils/Cloudinary'


export function Image(){

    const {state, dispatch} = useContext(PostContext)

    const ref =  useRef<HTMLInputElement>(null);

    function handleImage(e: React.ChangeEvent<HTMLInputElement>): void{

        if(!e.target.files){
            return;
        }

        let arr = [...state.ownPost.images];

        const filesList = e.target.files;

        if (filesList.length === 0){
            return
        }

        if(arr.length > 3 || filesList.length > 4){
            if(ref.current){
                ref.current.value = '';
        }
            window.alert("You can only include 4 photos per post")
            return
        }

        if(state.edit.post.photo?.length + state.ownPost.images.length === 4){
            window.alert("You can only include 4 photos per post..")
            if(ref.current){
                ref.current.value = '';
            }
            return
        }


        //Spread array to current state preview URLs
        for (let i = 0; i < filesList.length; i++) {
    
        const file = filesList[i];

        const reader = new FileReader();
        reader.onloadend = () => {
            //push new image to the end of arr
            arr.push(reader.result as string);
            //Set state to arr
            dispatch({type: 'image', payload: arr})


        };
        reader.readAsDataURL(file);
        }        
    
    };


    function handleImageDelete(event: React.FormEvent<HTMLButtonElement>){
        event.preventDefault();


        if(state.ownPost.images.length ){

            const image_to_remove: string = state.ownPost.images[parseInt(event.currentTarget.id)]

            const updated_images: string[] = state.ownPost.images.filter((photo) => photo !== image_to_remove )

            dispatch({type: 'image', payload: updated_images})

        }


        if(state.edit.post.photo){

                const image_to_remove = state.edit.post.photo.find(element => element.photo_id === event.currentTarget.id)
                
                const updated = state.edit.post.photo.filter((photo) => photo !== image_to_remove)


                dispatch({type: 'cloudinaryimage', payload: updated as imageType[]})

                dispatch({type: 'addDeleted', payload: image_to_remove?.photo_id as string})



            }



        if(state.ownPost.images.length === 0 || state.edit.post.photo?.length === 0){

            if(ref.current){
                ref.current.value = '';
            }

        }

    }



    return(

        <div className='d-flex flex-column container-images-componenet'>  


            <div className='d-flex flex-wrap justify-content-center container-modal-bro'>
                {state.ownPost.images.length > 0 &&


                state.ownPost.images.map((element: string, index) =>
                        <div className='d-flex flex-column delete-buttons'>

                                <img src = {element} alt = '' className='imagesk'></img>
                                <Button id = {String(index)} onClick = {handleImageDelete}>Delete Image</Button>

                        </div>

                )}


                {state.edit.status && 


                state.edit.post.photo?.map((pic, index) =>

                    <div className='d-flex flex-column delete-buttons'>

                        <AdvancedImage cldImg={cld.image(pic.photo_id)} className = 'imagesk' />

                        <Button id = {pic.photo_id} onClick = {handleImageDelete}>Delete Image</Button>

                    </div>
                
                )}

            </div> 


            <div className='add-image-buttons'>

                <label htmlFor = 'formFileMultiple' className='form-label'>Add Images</label>
                
                <input className='form-control' type = 'file' 
                        accept='image/*' id = 'formFileMultiple'
                        onChange={handleImage} ref = {ref} multiple></input>

            </div>



        </div>


    )

}

