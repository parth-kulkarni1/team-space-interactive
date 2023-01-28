import React, {useRef, useContext} from 'react'
import './Image.css'
import { PostContext } from '../Contexts/PostContext'


import { Button } from 'react-bootstrap'


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

            const image_to_remove: string = state.ownPost.images[parseInt(event.currentTarget.id)]

            const updated_images: string[] = state.ownPost.images.filter((photo) => photo !== image_to_remove )

            dispatch({type: 'image', payload: updated_images})

            if(updated_images.length === 0){

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

                                <img src = {element} alt = '' className='imagesk' id = {String(index)}></img>
                                <Button id = {String(index)} onClick = {handleImageDelete}>Delete Image</Button>

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

