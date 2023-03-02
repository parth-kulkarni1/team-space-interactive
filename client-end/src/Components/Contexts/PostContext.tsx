import React, {createContext, ReactNode, useReducer} from "react";
import { postReducer } from "../Reducers/PostContextReducer";
import { getAllPostsResponse } from "../AxiosCommands/Post/AxiosPostTypes";
import { PostResponse } from "../AxiosCommands/Post/AxiosPostTypes";


export type postUser  = {
    title: string, body: string, userId: number, images: string[]

}

export type imageType = {
    id: string
    photo_id: string
}

export type imageReplyType = {
    id: number, 
    photo_id: string
}

export type postStructure = {
    title: string, 
    body: string, 
    post_id: number,
    createdAt: string,
    user?: post_obj_user, 
    photo?: imageType[],
    reply: reply[],
    reaction: reaction[],
    likeCount: number, 
    heartsCount: number

    
}

export type reaction = {
    id: number, 
    likes: number, 
    hearts: number, 
    user: post_obj_user,
    post: {post_id: number}
}

export type postStructureEdit = {
    title: string, 
    body: string, 
    post_id: number,
    createdAt: string,
    photo: imageType[],
  

}

export type post_obj_user = {
    id: number,
    firstName: string, 
    lastName: string, 
    profile_background: string, 
    email: string,
}

export type post_user_reply = {
    firstName: string,
    lastName: string, 
    profile_background: string, 
    email: string,
    cover_background: string, 
    id: number
}

export type reply = {
    body: string, 
    createdAt: string, 
    id: number, 
    photo: imageReplyType[], 
    updatedAt: string,
    user: post_user_reply, 
    childComments: reply[]
    parentComment: parentComment
}

type parentComment = {
    id: number,
    body: string, 
    createdAt: string, 
    updatedAt: string, 
}

export type replyOptional = {
    body?: string, 
    createdAt?: string, 
    id?: number, 
    photo?: imageReplyType[], 
    updatedAt?: string,
    user?: post_user_reply, 
    childComments?: reply[],
    parentComment?: parentComment
}

export type PostEdit = {
    status: boolean, 
    post: postStructureEdit, 
    imageHandling: {deletedImages: string[], localImages: string[]}

}

// defining constants for inital state 

export const editReset = 
    {status: false, post: { title: '', 
    body: '', 
    post_id: 0,
    createdAt: '',
    photo: [],
    }, imageHandling: {deletedImages: [], localImages: []}}

export const ownPostReset = 
    {title: '', body: '', userId: 0, images: []}

export const currentPostReset = 
    { title: '', 
    body: '', 
    post_id: 0,
    createdAt: '',
    reply: [],
    reaction : [],
    likeCount: 0, 
    heartsCount: 0
}
    

const initalState: CurrentState = {    
    post: [],
    ownPost: ownPostReset,
    show: false,
    edit: editReset,
    reply: false, 
    currentPost: currentPostReset, 
    currentReplyOwner: null,
    editReply: '',
    viewReactions: false
}


export interface CurrentState{
    post: postStructure[]
    ownPost: postUser,
    show: boolean
    edit: PostEdit,
    reply: boolean, 
    currentPost: postStructure,
    currentReplyOwner: replyOptional | null,
    editReply: string,
    viewReactions: boolean
   

}



    

export type CurrentAction = {
    type: 'allPosts' | true | false | 'title' | 'resetPost' | 'body' | 
           'image'  | 'edit'| 'cloudinaryimage'|'reset'| 'localPost' | 'addDeleted' | 'updateEdited' | 'deletePost' | 'viewReplies' | 'currentPost' |'addReply'
           | 'replyOwner' | 'addChildReply' |'addParentReply' |'deleteReplyParent' | 'deleteReplyChild'| 'editReply' |'incrementLike' | 'incrementHeart'| 'decrementLike' |'addLikeReaction'
           | 'addHeartReaction' | 'decrementHeart' |'viewReactions'
    payload: string | boolean | string[] | postStructure[] | getAllPostsResponse 
            | postUser | imageType | postStructureEdit | imageType[] | PostResponse | postStructure| PostEdit | reply | number | reply[] | null | reaction

}




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

