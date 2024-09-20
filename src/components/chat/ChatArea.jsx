import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton, List, ListItem, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import api from '../../configs/api';
import { userUser } from '../../contexts/UserContext';
import autoScroll from '../../utility/autoScroll';
import getEnv from '../../utility/getEnv'



const ChatApp = ({ selectedUser }) => {
    
    const { user } = userUser()

    const socket = io(getEnv('VITE_SERVER_URL'))
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const handleSend = (e) => {
        e.preventDefault()
        if (!message) return
        socket.emit('message', { yourId: user._id, otherId: selectedUser._id, message });
        setMessage('');
    };

    useEffect(() =>{
        socket.emit('create-room', { yourId: user._id, otherId: selectedUser._id})
        api.get(`/getMessages/${user._id}/${selectedUser._id}`)
            .then(res => setMessages(res.data.messages));
    }, [user._id, selectedUser._id]); // Adding dependencies to re-run effect when `user._id` or `selectedUser._id` changes

    useEffect(() =>{
        const handleMessage = (message) => setMessages(prevMessages => [...prevMessages, message]); // Using functional update
        autoScroll(true)
        socket.on('message', handleMessage);
    }, [socket]);

    return (
        <Box sx={styles.chatContainer}>
            {/* Chat Header */}
            <Box sx={styles.chatHeader}>
                <Typography variant="h6">
                    {selectedUser.username}
                </Typography>
            </Box>

            {/* Chat Messages */}
            <Box sx={styles.chatMessages} className='chat-body'>
                <List sx={styles.messageList}>
                    {
                         messages.map(msg => (
                            <ListItem key={msg.message} sx={msg.sender === user._id ? styles.messageSent : styles.messageReceived}>
                                <Paper sx={msg.sender === user._id ? styles.messagePaperSent : styles.messagePaper}>
                                    <Typography>{msg.message}</Typography>
                                </Paper>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>

            {/* Chat Input */}
            <form onSubmit={handleSend}>
                <Box sx={styles.chatInput} >
                    <TextField
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        variant="outlined"
                        fullWidth
                        placeholder={`Say hi to ${selectedUser.username} 👋`}
                        sx={styles.textField}
                    />
                
                    <IconButton type='submmit' color="primary" sx={styles.sendButton}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </form>
        </Box>
    );
};

const styles = {
    chatContainer: {
        width: '100%',
        height: '100%',
        border: '1px solid #ccc',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
    },
    chatHeader: {
        padding: '10px',
        backgroundColor: '#1976d2',
        color: 'white',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        textAlign: 'center',
    },
    chatMessages: {
        flexGrow: 1,
        overflowY: 'auto',
        padding: '10px',
        backgroundColor: '#fff',
    },
    messageList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
    },
    messageReceived: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '10px',
    },
    messageSent: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '10px',
    },
    messagePaper: {
        padding: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        maxWidth: '70%',
    },
    messagePaperSent: {
        padding: '10px',
        backgroundColor: '#1976d2',
        color: 'white',
        borderRadius: '10px',
        maxWidth: '70%',
    },
    chatInput: {
        display: 'flex',
        padding: '10px',
        backgroundColor: '#f1f1f1',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
    },
    textField: {
        marginRight: '10px',
    },
    sendButton: {
        alignSelf: 'center',
    },
};

export default ChatApp;