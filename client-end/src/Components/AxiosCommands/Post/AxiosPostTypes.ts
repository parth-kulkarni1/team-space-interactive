import { post_obj_user } from "../../Contexts/PostContext"
import { imageType } from "../../Contexts/PostContext"

export type PostInfo = {
    title: string, 
    body: string,
    userId: number,
    images: string[]
}

export type Post = {
    title: string, 
    body: string,
    userId: number,
    user: post_obj_user,
    photo: imageType[]

}

export type PostResponse = {
    title: string,
    body: string,
    createdAt: string, 
    post_id: number, 
    user: post_obj_user,
    photo: imageType[]
}

export type getAllPostsResponse = {
    posts: Post[]
}

export type ImageInfo = {
    image: string[]
}