import { DatePicker, Input, Modal, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Option } from 'antd/lib/mentions'
import axios from 'axios'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { API_URL } from '../axios'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IUser } from '../models/IUser'
import { eventSlice } from '../store/reducers/EventSlice'

interface AddEventModalProps {
    users: IUser[],
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

const AddEventModal: FC<AddEventModalProps> = ({users, modalVisible, setModalVisible}) => {
    const [eventName, setEventName] = useState<string>("")
    const [eventDate, setEventDate] = useState<string | undefined>("")
    const [eventDesc, setEventDesc] = useState<string>("")

    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const {addEvent} = eventSlice.actions

    const [guestId, setGuestId] = useState<number | null>(null)

    const newEvent = async () => {
        await axios.post(`${API_URL}events/?id=${user.id}`, {
          date: eventDate,
          title: eventName,
          description: eventDesc,
          guestId
        })
        dispatch(addEvent({
          title: eventName,
          description: eventDesc,
          owner_id: user.id,
          guest_id: guestId || null,
          event_date: eventDate
        }))
        setModalVisible(false)
      }

  return (
    <Modal title="Добавить событие" visible={modalVisible} onOk={() => {newEvent()}} onCancel={() => setModalVisible(false)}>
          <Input
          type="text"
          placeholder="Введите название события"
          required
          value={eventName}
          onChange={e => setEventName(e.target.value)}
          />
          <TextArea
            placeholder="Описание"
            autoSize
            value={eventDesc}
            onChange={e => setEventDesc(e.target.value)}
            />
          <DatePicker
          placeholder='Выберите дату'
          onChange={e => setEventDate(e?.toJSON().slice(0,10))}
          />
          <Row></Row>          
          <Select 
            defaultValue={users[0].name === user.name ? undefined : users[0].name}
            style={{ width: 200 }}
            allowClear
            placeholder="Выберите гостя"
            onChange={e => setGuestId(+e)}
            >
            {users.map(currentUser =>
              currentUser.name !== user.name
              ?
              <Option key={currentUser.id.toString()} value={currentUser.id.toString()}>{currentUser.name}</Option>
              :
              <></>
            )}
          </Select>
        </Modal>
  )
}

export default AddEventModal