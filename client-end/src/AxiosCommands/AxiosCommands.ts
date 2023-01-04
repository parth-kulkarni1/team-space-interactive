import axios from "axios"; 
import {CreateUser, getResponse, getResponse1, CookieResponse,
        UserChange, userChange1, 
        profile, passwordChange, encodedJSON, UserNameOnly} from './AxiosTypes'


type cover = {
    'cover_background': string

}


export async function createUser(user: CreateUser){
    const {data} = await axios.post<CreateUser>("/users", user,
    {
        headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        },
    );

    console.log(data)

    return data
}


export async function verifyUser(username: string, password : string){
    const {data} = await axios.get<getResponse>("/login", { params: { username, password } })

    console.log(data, "login")
   
    return data;
}


export async function findUser(id: string){
    const {data} = await axios.get<getResponse1>(`/users/${id}`)

    console.log(data)

    return data


}


export async function findCookie(){
    const {data} = await axios.get<CookieResponse>('/users')

    console.log(data)

    return data

}

export async function logoutUser(){
    const {data} = await axios.get('/logout')

    return data


}

export async function updateUser(profile: profile): Promise <UserChange | userChange1>{
    const {data} = await axios.put<userChange1 | UserChange>("/users", profile)

    console.log(data)

    return data

}


export async function updatePassword(passwordChange: passwordChange){
    const {data} = await axios.put("/change", passwordChange)

    console.log(data)

    return data

}


export async function deleteAccount(id: string){
    const {data} = await axios.delete(`/delete/${id}`)

    console.log(data)

    return data

}

export async function uploadCoverImageCloudinary(encodedJSON : encodedJSON){
    const {data} = await axios.post('/upload/cover', encodedJSON)

    return data


}


