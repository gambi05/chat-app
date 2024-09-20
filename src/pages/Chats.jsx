import React, { useEffect, useState } from 'react'
import { userUser } from '../contexts/UserContext'
import { Box, Typography } from '@mui/material'
import ListOfUsers from '../components/chat/ListOfUsers'
import { pink } from '@mui/material/colors'
import Welcome from '../components/chat/Welcome'
import ChatArea from '../components/chat/ChatArea'
import api from '../configs/api'

const Chats = () => {
  
  const {user} = userUser()
    const [selectedUser, setSelectedUser] = useState(null)
    // users to talk with
    const [users, setUsers] = useState([])

    useEffect(() => {
      api.get('/getAllUsers')
          .then(res => setUsers(res.data.users))
  }, [])

    return (
      <Box sx={{ background: pink[100], height: '80vh', mt: 5, width: '80%', mx: 'auto', display: 'flex' }}>
            {/* list of users */}
            <ListOfUsers users={users} setSelectedUser={setSelectedUser} />

            {
                selectedUser ?
                    <ChatArea selectedUser={selectedUser} /> :
                    <Welcome user={user} />
            }

        </Box>
    )
}

export default Chats