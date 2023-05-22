import { Button } from '@mui/material'
import React from 'react'

function LoginChecker() {
  return (
    <div className='row'>
        <div className='card'>
            <div className='card-header text-muted fw-bold'>
                Access Denied!
            </div>
            <div className='card-body'>
                <Button>Pls SiGnIn</Button>
            </div>
        </div>

    </div>
  )
}

export default LoginChecker