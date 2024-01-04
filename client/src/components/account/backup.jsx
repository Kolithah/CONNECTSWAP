import React from 'react'
import { Container, Row, Col ,Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './account.css'
const index = () => {
  return (
    <>
    <Container >
        <Row>
            <h1>Profile</h1>
        </Row>  </Container>
        <Row className='content-container'> 

            <Col lg={3} md={4} xs={2} className='section-menu flex'>
           
              
               <div as={Link} className='menu-button dashboard'><span className='some1'>Dashboard</span></div> 
               <div as={Link} className='menu-button menu-element'>Ongoing exchanges</div> 
               <div as={Link} className='menu-button menu-element'>Cancelled exchanges</div> 
               <div as={Link} className='menu-button menu-element'>Succesful exchanges</div> 
               <div as={Link} className='menu-button menu-element'>Profile</div> 
              
            </Col>

            <Col lg={9} md={8} xs={10} className='section'>
            <h3> Details</h3>
            <div> Notifications
                <div></div>
                <div></div>

            </div>
            <div>
                Messages
                <div></div>
                <div></div>

            </div>

            
            
            </Col>
        </Row>

        
   
    </>
  )
}

export default index;
