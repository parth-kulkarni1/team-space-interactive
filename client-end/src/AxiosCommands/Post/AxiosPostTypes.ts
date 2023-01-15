import { post_obj_user } from "../../Reducers/PostReducer"

export type PostInfo = {
    title: string, 
    body: string,
    userId: number,
}

export type PostDude = {
    title: string, 
    body: string,
    userId: number,
    user: post_obj_user
}

export type PostResponse = {
    'created': string
}

export type getAllPostsResponse = {
    posts: PostDude[]
}