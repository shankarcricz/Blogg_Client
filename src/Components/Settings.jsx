import React, { useState } from 'react'
import RightMenu from './Feature/RightMenu'
import { Add, Dangerous, Edit, Repeat, VerifiedOutlined } from '@mui/icons-material'
import { InputGroup } from 'react-bootstrap'
import { Button } from 'bootstrap'
import './Settings.css'
import { Alert } from 'react-bootstrap';
import axios from 'axios'
import Cookies from 'js-cookie'

function Settings() {

  const [name, setName] = useState('')
  const [email, setEmai] = useState('')
  const [dob, setDOB] = useState('')



  return (
    <>
    <div className='container'>
        <div style={{display:'grid', placeItems:'center'}} className='photo'>
            <img alt='img'
            style={{
                margin:'10px',
                borderRadius:'50px',
                boxShadow:'2px 6px 5px grey',
                maxHeight:'300px', maxWidth:'300px'}} src={sessionStorage.getItem('currentUser_photo')}></img>
        </div>
        <div className='card edit-personal-info'>
            <div className='card-header'>
                Edit Personal Info
            </div>
            <div className='row m-2' style={{justifyContent:'space-between'}}>
                <div className='col-lg-3 m-2'>
                <InputGroup>
                     <input id="name" value="shankar" disabled className='form-control' type='text'></input>
                     <Edit/>
                </InputGroup>
                </div>
                <div className='col-lg-3 m-2'>
                <InputGroup>
                     <input value="Email" disabled className='form-control' type='email'></input>
                     <Edit/>
                </InputGroup>
                </div>
                <div className='col-lg-3 m-2'>
                <InputGroup>
                     <input  className='form-control' type='date'></input>
                     <Add/>
                </InputGroup>
                </div>
            </div>
            <button type="submit" className="w-50 mx-auto btn btn-dark m-2">Save</button>
            <div></div>
        </div>
        <h3 className='m-3'>Analytics for your Blogs</h3>
        <RightMenu/>
    </div>
    </>
  )
}

export default Settings