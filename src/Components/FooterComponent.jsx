import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Facebook, FacebookRounded, GitHub, Google, LinkedIn, WhatsApp } from '@mui/icons-material';

export default function FooterComponent() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-2'>
        <section className='mb-4'>
        <FacebookRounded className='m-2'/>
        <LinkedIn className='m-2'/>
        <GitHub className='m-2'/>
        <WhatsApp className='m-2'/>
        </section>

        <section className=''>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Sign up for our weekly newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md='5' start>
                <MDBInput contrast type='email' label='Email address' className='mb-4' />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className='mb-4'>
          <p>
          Socio is a platform  that facilitate the creation and sharing of information, ideas, interests, and other forms of expression through virtual communities and networks.
          </p>
        </section>

        
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright:
        <a className='text-white' href='javascript:void(0);'>
          Socio
        </a>
      </div>
    </MDBFooter>
  );
}