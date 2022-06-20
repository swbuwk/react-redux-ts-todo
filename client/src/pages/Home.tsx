import React from 'react'
import { Navigate } from 'react-router-dom'
import EventCalendar from '../components/EventCalendar'
import { useAppSelector } from '../hooks/redux'

const Home = () => {
    const user = useAppSelector(state => state.userReducer)

    if (!user.isAuth) return <Navigate to="/login"/>

  return (
    <div>
        <EventCalendar></EventCalendar>
    </div>
  )
}

export default Home