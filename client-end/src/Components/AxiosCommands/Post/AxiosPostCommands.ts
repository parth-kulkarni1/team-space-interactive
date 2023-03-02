import axios, { HttpStatusCode } from "axios";
import { reaction, reply } from "../../Contexts/PostContext";
import { getAllPostsResponse, PostInfo, PostResponse, ImageInfo, ReplyResponse, ReplyToReplyInput, PostReplyInput } from "./AxiosPostTypes";


export async function createPost(post_info: PostInfo){
    const {data} = await axios.post<PostResponse>('/post/create', post_info)

    console.log(data)

    return data


}


export async function getAllPosts(){
    const {data} = await axios.get<getAllPostsResponse>('/posts')

    console.log(data)

    return data 


}


export async function uploadPostImages(){
    const {data} = await axios.post<ImageInfo>('/post/images')

    return data


}


export async function updatePost(post: any){
    const {data} = await axios.put<any>('/post/update', post )

    console.log(data)

    return data
}

export async function deletePost(id: number){
    const {data} = await axios.delete(`/post/delete/${id}`)

    return data

}

export async function createReply(reply: PostReplyInput){

    const {data} = await axios.post<reply>('/post/reply/create', reply)

    console.log(data)

    return data
}

export async function createReplyToReply(reply: ReplyToReplyInput){

    const {data} = await axios.post<reply>('/post/reply/reply', reply)

    console.log(data)

    return data
}

export async function deleteReply(id:number){
    const {data} = await axios.delete<HttpStatusCode>(`/post/reply/delete/${id}`)

    console.log(data)
    
    return data
}

export async function likePost(like: any){
    const {data} = await axios.post<reaction>('/post/reaction/like',  like)

    console.log(data)

    return data

}

export async function likeHeart(heart: any){
    const {data} = await axios.post<reaction>('/post/reaction/heart',  heart)

    console.log(data)

    return data


}

export async function deleteLike(likeId: number){
    const {data} = await axios.delete(`/post/reaction/like/remove/${likeId}`)

    console.log(data)

    return data


}


export async function deleteHeart(heartId: number){
    const {data} = await axios.delete(`/post/reaction/hearts/remove/${heartId}`)

    console.log(data)

    return data


}


