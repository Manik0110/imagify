import { createContext, useEffect, useState } from "react";
import userNavigate from 'react-router-dom'
import { toast } from "react-toastify";
import axios from 'axios'
import { AppContext } from './context'

const AppContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = userNavigate()

    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit, setCredit] = useState(0)

    const backendUrl = "https://mahesh-imagify-backend.onrender.com"


    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } })

            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken('');
        setUser(null);
    }

    {/*Functionto call image genrate API to generate image using promt  */ }

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token: token } })

            if (data.success) {
                loadCreditsData()
                return data.resultImage
            } else {
                toast.data.resultImage
                loadCreditsData()
            }
            const image = await generateImage(prompt)

            if (!image) {
                navigate('/buy')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])


    return (
        <AppContext.Provider value={{
            user,
            setUser,
            showLogin,
            setShowLogin,
            backendUrl,
            token,
            setToken,
            credit,
            setCredit,
            loadCreditsData,
            logout,
            generateImage
        }}>
            {props.children}
        </AppContext.Provider >
    )
}

export default AppContextProvider;
