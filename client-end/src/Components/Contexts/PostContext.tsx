import React, {createContext, ReactNode, useReducer} from "react";
import { postReducer } from "../Reducers/PostContextReducer";
import { getAllPostsResponse } from "../AxiosCommands/Post/AxiosPostTypes";
import { PostResponse } from "../AxiosCommands/Post/AxiosPostTypes";

export type postUser  = {
    title: string, body: string, userId: number, images: string[]

}

export type Errors = {
    title: string, 
    body: string
}

export type imageType = {
    photo_id: string
}

export type postStructure = {
    title: string, 
    body: string, 
    post_id: number,
    createdAt: string,
    user?: post_obj_user, 
    photo?: imageType[],
}

export type postStructureEdit = {
    title: string, 
    body: string, 
    post_id: number,
    createdAt: string,
    photo: imageType[],


}

export type post_obj_user = {
    firstName: string, 
    lastName: string, 
    profile_background: string, 
    email: string,
}

const initalState: CurrentState = {    
    post: [],
    ownPost: {title: '', body: '', userId: 0, images: []},
    show: false,
    errors: {title: '', body: ''},
    edit: {status: false, post: { title: '', 
        body: '', 
        post_id: 0,
        createdAt: '',
        photo: [], 
        }, imageHandling: {deletedImages: [], localImages: []}}
    

  }


export interface CurrentState{
    post: postStructure[]
    ownPost: postUser,
    show: boolean
    errors: {title: string, body: string}
    edit: {status: boolean, post: postStructureEdit, imageHandling: {deletedImages: string[], localImages: string[]}},


}



    

export type CurrentAction = {
    type: 'allPosts' | 'add' | true | false | 'title' |'errors' | 'resetPost' | 'body' | 'image' | 'upload' | 'edit'| 'cloudinaryimage'|'reset'| 'localPost' | 'addDeleted' | 'updateEdited' | 'deletePost'
    payload: string | boolean | postStructure[] | getAllPostsResponse | postUser| Errors | imageType | string[] |
    {status: boolean, post: postStructure} | imageType[] | PostResponse[] | {post_id: number} }





type PostContextProviderProps = {
    children: ReactNode
}


export const PostContext = createContext<{state: CurrentState, dispatch: React.Dispatch<CurrentAction>}>({
    state: initalState, 
    dispatch: () => {},
})


export const PostsContextProvider = ({children} : PostContextProviderProps) => {
    const [state, dispatch] = useReducer(postReducer, initalState);

    return(
        <PostContext.Provider value={{state, dispatch}}>
                {children}
        </PostContext.Provider>

    )


}

