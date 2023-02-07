import axios from "axios";
import { postStructure } from "../../Contexts/PostContext";
import { getAllPostsResponse, PostInfo, PostResponse, ImageInfo } from "./AxiosPostTypes";


export async function createPost(post_info: PostInfo){
    const {data} = await axios.post<PostResponse[]>('/post/create', post_info)

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