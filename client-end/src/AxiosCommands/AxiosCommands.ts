import axios from "axios";


/* Define all the DEFUALT HOST AND API NAMES */

const API_HOST: string = "http://localhost:4000";


/*---------------------------------------------*/


type CreateUser = {
    email: string, 
    firstName: string, 
    lastName: string, 
    password: string

}


export async function createUser(user: CreateUser){
    const response = await axios.post(API_HOST + "/api/users", user);

    return response.data


}