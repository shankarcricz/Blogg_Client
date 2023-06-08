import React from 'react'
import { CloseButton } from 'react-bootstrap';
import ReactDOM from 'react-dom';

function YesNoModal({isOpen, closeModal, handleSubmit}) {
  if(!isOpen) return;

  return ReactDOM.createPortal  (
    <div className='card' style={{
        position:'fixed',
        top:'50%',
        left:'50%',
        zIndex: 1000,
        transform:'translate(-50% ,-50%)',
        backgroundColor:'teal',
        color:'white',
    }}>
        <div className='card-header' style={{display:'flex', justifyContent:'space-between'}}>
            <div>
                Are you sure want to delete?
            </div>
            <div>
                <button onClick={closeModal}>
                    <CloseButton/>
                </button>
            </div>
            
        </div>
        <div className='card-body'>
            <button type='button' onClick={handleSubmit}>Yes</button>
            <button type="button" onClick={handleSubmit}>No</button>
        </div>
    </div>,
    document.getElementById('portal2')
   
  )
}

export default YesNoModal