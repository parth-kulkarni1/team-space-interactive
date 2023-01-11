import React, {createContext, useEffect, useState} from "react";
import { findCookie } from "../../AxiosCommands/User/AxiosUserCommands";
import { aUserContext as User } from "../Types/UserTypes";
   
    
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

                console.log("triggering again and again..")
        
                const userData: User = await findCookie(); // find the cookie and see if it's present
        
        
                if (userData.loggedIn === false){
                    setUser(userData)
                
                }
        
                else{
                    setUser(userData)
                }
        
                }
        
        
                InitaliseCookie();

                return () => {

                }
        
    
        }, [])
    
    
        return (
            <UserContext.Provider value = {{user, setUser}}>
                {user ? children: null}
            </UserContext.Provider>

        )


    } 



