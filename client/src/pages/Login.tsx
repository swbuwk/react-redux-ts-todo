import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { Input, Modal } from "antd"
import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom"
import { API_URL } from '../axios'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {userSlice} from "../store/reducers/UserSlice"

const Login = () => {
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    const {setUser} = userSlice.actions
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.userReducer)

    const login = async (email: string, password: string) => {
        const res = await axios.post(`${API_URL}auth/login`, {email, password})
        if (res.data.auth) {
            dispatch(setUser(res.data))
        }
    }

    if (user.isAuth) return <Navigate to="/events"/>

  return (
    <div>
        <form onSubmit={e => e.preventDefault()}>
        <Modal title="Логин" visible  onOk={() => login(inputEmail, inputPassword)}>
            <Input 
                placeholder="Электронная почта"
                type="text"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
            />
            <Input.Password
                placeholder="Пароль"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={inputPassword}
                onChange={e => setInputPassword(e.target.value)}
            />
            <Link to="/registration">На страницу регистрации</Link>
        </Modal>
        </form>

    </div>
  )
}

export default Login