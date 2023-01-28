import axios from "axios"; 
import {CreateUser, CookieResponse,
        UserChange, userChange1, 
        profile, passwordChange, encodedJSON, getUserDetails, cloudinaryResponse, CreateUserResponse} from './AxiosUserTypes'


export async function createUser(user: CreateUser): Promise<CreateUserResponse>{
    const {data} = await axios.post<CreateUserResponse>("/user/create", user,
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


export async function verifyUser(username: string, password : string): Promise<getUserDetails>{
    
    const {data} =  await axios.get<getUserDetails>("/login", { params: { username, password } })
   
    return data;
}


export async function findUser(id: string): Promise<null | true>{
    const {data} = await axios.get<null | true>(`/user/${id}`)

    console.log(data)

    return data


}


export async function findCookie(): Promise<CookieResponse>{
    const {data} = await axios.get<CookieResponse>('/user')

    console.log(data)

    return data

}

export async function logoutUser(): Promise<void>{
    
    await axios.get('/logout')

}

export async function updateUser(profile: profile): Promise <UserChange | userChange1>{
    const {data} = await axios.put<userChange1 | UserChange>("/user/update/name", profile)

    console.log(data)

    return data

}


export async function updatePassword(passwordChange: passwordChange): Promise<passwordChange>{
    const {data} = await axios.put<passwordChange>("/user/update/password", passwordChange)

    console.log(data)

    return data

}


export async function deleteAccount(id: string): Promise<any>{
    const {data} = await axios.delete(`/user/delete/${id}`)

    console.log(data)

    return data

}

export async function uploadCoverImageCloudinary(encodedJSON : encodedJSON): Promise<cloudinaryResponse>{
    const {data} = await axios.post<cloudinaryResponse>('/user/profile/images', encodedJSON)

    console.log(data)

    return data


}


