
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { passwordValidation, usernameValidation } from '../utility/inputValidations'
import api from '../configs/api'
import { userUser } from '../contexts/UserContext'

const Register = () => {
  const nav = useNavigate()
  const {setToken} =userUser

    const {
        register,
        handleSubmit, setError,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        api.post('/register', data)
            .then(res => {
                const data = res.data
                localStorage.setItem('token', data.token)
                setToken(data.token)
                nav('/chats')
                //console.log(data)
            }).catch(err => {
                const res = err.response
                setError(res.data.field, { type: 'validate', message: res.data.message })
            })
    }
  
  return (
    <Box sx={{ width: 300, m: 'auto', mt: 10 }}>
       <Typography variant='h4' mb={2}>
          Sign Up
       </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
       <TextField
            error={errors?.username?.message ? true: false}
            id="outlined-text"
            label="Username"
            fullWidth
            {...register('username', usernameValidation)}
          />
        
           <Typography color='error'>{errors?.username?.message}</Typography>
          <TextField
            error={errors?.username?.message ? true: false}
            id="outlined-text"
            label="Password"
            placeholder='*********'
            fullWidth
                    {...register('password', passwordValidation)}
          />
          <Typography color='error'>{errors?.password?.message}</Typography>
          <Button type='submit' sx={{ mt: 5}} variant='contained' fullWidth>Submit</Button>
          <Link to ='/login'>Already have an account?</Link>
        </form>
    </Box>
  )
}

export default Register