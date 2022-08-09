import React, { useState } from 'react'
import Alert from '@mui/material/Alert';

const AlertMessage = ({Type,message}) => {
  return (
    <Alert severity={Type}>{message}</Alert>
  )
}

export default AlertMessage