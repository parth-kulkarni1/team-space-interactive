import React, {createContext, useEffect, useState} from "react";
import { findCookie } from "../../AxiosCommands/AxiosCommands";
import { UserContext as User } from "../Types/UserTypes";
   
    
    type UserContextType = {
        user: User | null 
        setUser: React.Dispatch<React.SetStateAction<User | null>>

    }

    type UserContextProviderProps = {
        children: React.ReactNode
    }
    
    export const UserContext = createContext({} as UserContextType)

    export const UserContextProvider = ({children}: UserContextProviderProps) =>{

        const [user,setUser] = useState<User | null>(null); // Null as the user is logged in but this value can change

    useEffect(() =>{

        async function InitaliseCookie(){

        const userData: User = await findCookie(); // find the cookie and see if it's present

        console.log(userData)


        if (userData.loggedIn === false){
            setUser(null)
        }

        else{
            setUser(userData)
        }

        }


        InitaliseCookie();


    }, [user?.firstName, user?.lastName, user?.email, user?.loggedIn])

        return (
            <UserContext.Provider value = {{user, setUser}}>
                {children}
            </UserContext.Provider>

        )


    } 



