import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import { Modal, Input } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { API_URL } from '../axios'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { userSlice } from '../store/reducers/UserSlice'

const Registration = () => {
    const [inputEmail, setInputEmail] = useState("")
    const [inputName, setInputName] = useState("")
    const [inputPassword, setInputPassword] = useState("")

    const {setUser} = userSlice.actions
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.userReducer)

    const registration = async (email: string, name: string, password: string) => {
        const res = await axios.post(`${API_URL}auth/registration`, {email, name, password})
        console.log(res.data)
        if (res.data.reg) {
            dispatch(setUser(res.data))
        }
    }

    if (user.isAuth) return <Navigate to="/events"/>

  return (
    <div>
        <Modal title="Логин" visible  onOk={() => registration(inputEmail, inputName, inputPassword)}>
            <Input 
                placeholder="Никнейм"
                type="text"
                value={inputName}
                onChange={e => setInputName(e.target.value)}
            />
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
            <Link to="/login">На страницу логина</Link>
        </Modal>
    </div>
  )
}

export default Registration