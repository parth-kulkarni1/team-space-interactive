import { postStructure } from "../Contexts/PostContext"
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

        



        default :
        return state
    }

}
