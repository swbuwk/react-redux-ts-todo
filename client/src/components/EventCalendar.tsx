/* eslint-disable react-hooks/exhaustive-deps */
import { Calendar, Modal } from 'antd'
import axios from 'axios'
import { Moment } from 'moment'
import { useEffect, useState } from 'react'
import { API_URL } from '../axios'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { eventSlice } from '../store/reducers/EventSlice'
import AddEventModal from './AddEventModal'

const EventCalendar = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [eventModalVisible, setEventModalVisible] = useState<boolean>(false)
  const [eventModal, setEventModal] = useState<IEvent | null>()
  const [isLoading, setIsLoading] = useState(true)

  const [users, setUsers] = useState<IUser[]>([])

  const {addManyEvents} = eventSlice.actions
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userReducer)
  const {events} = useAppSelector(state => state.eventReducer)

  useEffect(() => {
    const fetchUsers = async () => {
      const res_users = await axios.get(`${API_URL}users/`)
      setUsers(res_users.data)
      const res_events = await axios.get(`${API_URL}events/?id=${user.id}`)
      dispatch(addManyEvents(res_events.data))
      setIsLoading(false)
    }
    fetchUsers()
  }, [])

  

  const dateCellRender = (value: Moment) => {
    const currEvents = events.filter(event => event.event_date === value.toJSON().slice(0,10))

    return (
      currEvents.map((event, i) =>
        <div key={i} style={{border: "1px solid black"}} onClick={() => openEvent(event)}>
          {event.title}
          <div style={{color: "gray"}}>{event.description}</div>
        </div>)
      
    )
  }

  const openEvent = (event: IEvent) => {
    setEventModal(event)
    setEventModalVisible(true)
  }

  if (isLoading) return <></>

  return (
    <div>
        <Calendar dateCellRender={dateCellRender}/>
        <AddEventModal 
          users={users} 
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}/>
        <Modal
            title={eventModal?.event_date}
            visible={eventModalVisible}
            onOk={() => setEventModalVisible(false)} 
            onCancel={() => setEventModalVisible(false)}>
              <div>{eventModal?.title}</div>
              <div>{eventModal?.description}</div>
        </Modal>
        <button onClick={() => setModalVisible(true)}>Добавить событие</button>

    </div>
  )
}

export default EventCalendar