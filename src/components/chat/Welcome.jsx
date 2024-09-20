import { Box, Typography } from '@mui/material'
import React from 'react'

const Welcome = ({ user }) => {
    return (
        <Box width={'100%'} display={'flex'} alignItems='center' justifyContent='center'>
            <Typography variant='h3'>
                Welcome, {user?.username}
            </Typography>
        </Box>
    )
}

export default Welcome