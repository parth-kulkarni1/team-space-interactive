import axios from "axios";
import { getAllPostsResponse, PostInfo, PostResponse } from "./AxiosPostTypes";


export async function createPost(post_info: PostInfo){
    const {data} = await axios.post<PostResponse>('/post/create', post_info)

    console.log(data.created)

    return data


}


export async function getAllPosts(){
    const {data} = await axios.get<getAllPostsResponse>('/posts')

    console.log(data)

    return data 


}