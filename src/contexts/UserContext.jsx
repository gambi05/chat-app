import { createContext, useContext, useEffect, useState } from "react"
import api from "../configs/api"
import { useNavigate } from "react-router-dom"

const UserContext = createContext()

const UserProvider = ({ children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')
    const nav = useNavigate();

    const logout = ()=> {
        localStorage.removeItem('token')
        setToken('')
        nav('/login')
    }

    useEffect(() => {
        api.get('/currentUser', { headers: { Authorization: `Bearer ${token}`}})
        .then(res => setUser(res.data.user))
        .catch(()=> navigator('/login'))
    }, [token])

    return <UserContext.Provider value = {{ user, setToken, logout}}>
        {children}
        </UserContext.Provider>
}
export default UserProvider
export const userUser = ()=> useContext(UserContext)