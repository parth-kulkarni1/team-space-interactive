import axios, { AxiosResponse } from "axios"; 



/* Define all the DEFUALT HOST AND API NAMES */

const API_HOST: string = "http://localhost:4000";


/*---------------------------------------------*/


/* Defining the Types */

type CreateUser = {
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string

}


type VetifyUser = {
    email: string, 
    password: string,
    lastName: string,
    firstName: string,
}


type getResponse = {
    lastName: string,
    firstName: string,
    data: VetifyUser[]; 
}

type getResponse1 = {
    data: CreateUser[];
}





/*-----------------------------------------------*/


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
    const {data} = await axios.get('/users')

    console.log(data)

    return data

}

export async function logoutUser(){
    const {data} = await axios.get('/logout')

    return data


}


