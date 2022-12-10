    import React, {createContext, useState} from "react";

    export type User = {
        email: string;
        firstName: string; 
        lastName: string;
        loggedIn: boolean;
    }
    
    type UserContextType = {
        user: User | null
        setUser: React.Dispatch<React.SetStateAction<User | null>>

    }


    type UserContextProviderProps = {
        children: React.ReactNode
    }
    
    export const UserContext = createContext<UserContextType | null>(null)

    export const UserContextProvider = ({children}: UserContextProviderProps) =>{
        const [user,setUser] = useState<User | null>(null); // Null as the user is logged in but this value can change

        return (
            <UserContext.Provider value = {{user, setUser}}>
                {children}
            </UserContext.Provider>

        )







    } 



