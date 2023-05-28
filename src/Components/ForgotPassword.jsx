import React, { useState } from 'react'
import RightMenu from './Feature/RightMenu'
import { Add, Dangerous, Edit, Repeat, VerifiedOutlined } from '@mui/icons-material'
import { InputGroup } from 'react-bootstrap'
import { Button } from 'bootstrap'
import './Settings.css'
import { Alert } from 'react-bootstrap';
import axios from 'axios'
import Cookies from 'js-cookie'

function ForgotPassword() {

  const [securityEmail, setSecurityEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validEmail, setValidEmail] = useState(true)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [validToken, setValidToken] = useState(true)
  const [emptyFields, setEmptyFields] = useState(false)
  const [tokenSent, setTokenSent] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

    const forgotPassword = async () => {
        try {
            let response = await axios.post('https://bloggserver.onrender.com/users/forgotPassword', {email : securityEmail});
            if(response.status === 200 && response.data.message === 'Token sent to email!') {
                setTokenSent(true)
            } else {
                setTokenSent(false)
            }
        } catch (e) {
            console.log(e)
        }
    } 
    const resetPassword = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('jwt')
            let response = await axios.patch('https://bloggserver.onrender.com/users/resetPassword/'+ token, {password, passwordConfirm : confirmPassword});
            if(response.status===201 && response.data.status === 'success' && response.data.token) {
                Cookies.set('jwt', response.data.token)
                setResetSuccess(true);
            }
        } catch(e) {
            console.log(e)
        }
    }


  const handleSecurityEmail = (e) => {
    setSecurityEmail(e.target.value)
        if(!ValidateForm(e.target.value, 'email')) {
            setValidEmail(false)
            return;
        }
        setValidEmail(true)
       
    }
    const handleToken = (e) => {
        setToken(e.target.value)
        if(!ValidateForm(e.target.value, 'token' )) {
            setValidToken(false)
            return;
        }
        setValidToken(true)
        
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        if(!ValidateForm(e.target.value, 'password')) return;
        
    }
    const handlePasswordConfirm = (e) => {
        setConfirmPassword(e.target.value)
        if(!ValidateForm(e.target.value, 'passwordConfirm')) {
            setPasswordMatch(false)
            return;
        }
        setPasswordMatch(true)
       
    }
    const ValidateForm = (value, type) => {
        if(type === 'token' || type==='email' || type==='password' || type=== 'passwordConform') {
            if(value === "") {
                return false
            } else {
                return true
            }
        } else if (type === 'passwordConfirm') {
            if(value === password) {
                return true;
            } else {
                return false;
            }
        }
    }

  return (
    <>
    <div className='container'>
        <div className='card Security section mt-2'>
            <div className='card-header'>
                Security Section
            </div>
            {
                !tokenSent && <div className='card-body mail-block' style={{display:'grid', placeItems:'center'}}>
                <small>Forgot password?</small>
                <input value={securityEmail} onChange={handleSecurityEmail} placeholder='Enter your email' type='email' className='form-control w-50'>
                </input>
                {
                    !validEmail && <p style={{color:'red'}} className='email_invalid_err_msg'>
                    <Dangerous/> Invalid email!
                </p>
                }
                
                <button onClick={forgotPassword} type='submit' className='btn btn-dark m-2'>Get Token To mail</button>
            </div>
            }
            {
                tokenSent && !resetSuccess && <div className='card-body token-block' style={{display:'grid', placeItems:'center'}}>
                <small>Check your mail for the token</small>
                <input value={token} onChange={handleToken} placeholder='token' type='text' className='form-control w-50 m-1'>
                </input>
                <input value={password} onChange={handlePassword} placeholder='Password' type='password' className='form-control w-50 m-1'>
                </input>
                <input value={confirmPassword} onChange={handlePasswordConfirm} placeholder='Password Confirm' type='password' className='form-control w-50 m-1'>
                </input>

                <div className='err_msg' style={{placeItems:'center', display:'grid'}}>
                {
                    !validToken && <p style={{color:'red'}} className='invalid_token_err_msg'>
                    <Dangerous/> Invalid token! Try again
                    </p>
                }
                {
                    !passwordMatch &&  <p style={{color:'red'}} className='pass_mismatch_err_msg'>
                    <Dangerous/> Passwords do not match!                                                                                                                                                                                                              
                </p>
                }
                

                  {
                    emptyFields && <p style={{color:'red'}} className='empty_field_err_msg'>
                    <Dangerous/> All fields must be filled!                                                                                                                                                                                                             
                    </p>
                  } 
                    
                    
                </div>
                <button onClick={resetPassword} type='submit' className='btn btn-dark m-2'>Reset Password</button>
            </div>
            }
            
            {
                resetSuccess && <div className='card-body success-block' style={{display:'grid', placeItems:'center'}}>
                <VerifiedOutlined fontSize='large' style={{color:'green'}}/>
                <h2>Success!</h2>
                <button type="button" className='btn btn-dark m-1'>Done</button>
            </div>
            }
            
        </div>
    </div>
    </>
  )
}

export default ForgotPassword