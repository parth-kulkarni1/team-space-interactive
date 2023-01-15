import { getAllPostsResponse } from "../AxiosCommands/Post/AxiosPostTypes";

export type post_obj_user = {
    firstName: string, 
    lastName: string, 
    profile_background: string, 
    email: string,
}

export type postStructure = {
    title: string, 
    body: string, 
    post_id: number,
    createdAt: string,
    user: post_obj_user
}

export const initalState: CurrentState = {
    show: false,
    value: '',
    post: {title: '', body: '', userId: 0},
    errors: {title: '', body: ''},
    allPosts: [],
    uploadImage: ''
}

interface CurrentState{
    show: boolean
    value: string,
    post: {title: string, body: string, userId: number},
    errors: {title: string, body: string},
    allPosts: postStructure[]
    uploadImage: string
}

type Errors = {
    title: string, 
    body: string
}

type CurrentAction = {
   type: true | false | 'add' | 'title' |'errors' | 'resetPost'| 'allPosts'
   payload: string | boolean | Errors | postStructure[]| getAllPostsResponse

  }


export function reducer(state: CurrentState, action: CurrentAction): CurrentState{
    switch(action.type){
        case true:
        return {...state, show: action.payload as boolean}

        case false:
            return {...state, show: action.payload as boolean}

        case 'add':
            console.log(action.payload)
            return {...state, post: {...state.post, body: action.payload as string }}

        case 'title':
            return {...state, post: {...state.post, title: action.payload as string}}

        case 'errors':
            return {...state, errors: action.payload as Errors}

        case 'resetPost':
            return {...state, post: {...state.post, title: action.payload as string, body: action.payload as string}}

        
        case 'allPosts':
            return {...state, allPosts: action.payload as postStructure[]}
        
        
        default:
            return state

    
    }


}

