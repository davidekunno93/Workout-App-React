import axios from "axios"
import { createContext, useState } from "react"


const DataProvider = (props) => {
    // const [user, setUser] = useState({"authenticated" : false, "user" : null})
    const [user, setUser] = useState(null)
    
    const getUsers = async () => {
        const resp = await axios.get("http://localhost:5000/api/users-database")
        return resp.data
    }
    
    const loadUsers = async () => {
        const resp = getUsers()
        // .then(data => setUsers(data.data))
        .then(data => console.log(data.data))
    }
    
    const [users, setUsers] = useState(() => loadUsers())

    return(
        <DataContext.Provider value={{"user": user, "setUser": setUser}}>
            {props.children}
        </DataContext.Provider>
    )
}
export default DataProvider;
export const DataContext = createContext();