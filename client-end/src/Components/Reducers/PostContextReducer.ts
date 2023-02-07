import { act } from "@testing-library/react"
import { PostResponse } from "../AxiosCommands/Post/AxiosPostTypes"
import { imageType, postStructure, postStructureEdit } from "../Contexts/PostContext"
import { CurrentAction, CurrentState, postUser, Errors} from "../Contexts/PostContext"

export function postReducer(state: CurrentState, action: CurrentAction): CurrentState{
    switch(action.type){
        case 'allPosts':{
            return {...state, post: action.payload as postStructure[]}
        }

        case 'add':
            return {...state, ownPost: action.payload as postUser }


        case 'body':
            return {...state, ownPost: {...state.ownPost, body: action.payload as string}}

        case true:
            return {...state, show: action.payload as boolean}

        case false:
            return {...state, show: action.payload as boolean}

        case 'title':
            return {...state, ownPost: {...state.ownPost, title: action.payload as string}}

        case 'errors':
            return {...state, errors: action.payload as Errors}

        case 'resetPost':
            return {...state, ownPost: {...state.ownPost, title: action.payload as string, body: action.payload as string}}

        case 'image':
            return {...state, ownPost: {...state.ownPost, images: action.payload as string[]}}

        
        case 'cloudinaryimage': 
            return {...state, edit: {...state.edit, post : {...state.edit.post, photo: action.payload as imageType[]}}}

        case 'edit':
            return {...state, edit : {...state.edit, status: true, post: action.payload as postStructureEdit}

        }

        case 'reset':
            return {...state, edit: {...state.edit, status: false, post: action.payload as postStructureEdit}}


        case 'localPost': 

            return {...state, post: [action.payload as postStructure, ...state.post]}

        case 'updateEdited':
            const payload = action.payload as postStructure

            return {...state, post: [payload, ...state.post.filter(post => post.post_id !== payload.post_id)]}

        case 'addDeleted':

            return{...state, edit: {...state.edit, imageHandling: {...state.edit.imageHandling, deletedImages: [...state.edit.imageHandling.deletedImages, action.payload as string]}}}



        default :
        return state
    }

}
