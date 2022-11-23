import React from 'react';
import Row from 'react-bootstrap/Row';
import api from '../API';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { Alert, Card, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeUser } from '../Redux/Login.state';
import img from './mago.png';

const Login = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [pdwInput, setpwdInput] = useState<string>('');
    const [errLogin, setErrLogin] = useState<boolean>(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        if(event.target.type === 'text') return setUserInput(event.target.value);
        return setpwdInput(event.target.value);
    };

   const handleClick= async () => {
    try{
      await api.post('/', {username: userInput, passwordHash: pdwInput })
    } catch {
       setErrLogin(true)
       return setTimeout(() => {setErrLogin(false)}, 2000);
     }
    const response = await api.post('/', {username: userInput, passwordHash: pdwInput })
    dispatch(changeUser({ user: userInput, token: response.data }))
   return navigate('/home');
    }

    return (
        <>
        <Container fluid> 
        <Card
        className='text-center'
            bg='dark'
            text='white'
            >
              <Col md={{ span: 1, offset: 5 }}>
              <Image width={300} src={img}/>
              </Col>
            <Card.Header>
                <Card.Title>MageBank - Login</Card.Title>
            </Card.Header>   
            </Card>

        <Row>
   <Col
   md={{ span: 1, offset: 5 }}
   style={{ width: '18rem' }}
   className="text-center"
   >
        <Col>
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Seu Username" onChange={ handleChange } />
            </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" placeholder="Password" onChange={ handleChange } />
             </Form.Group>
              <Button onClick={ handleClick } variant="outline-dark" size='lg'>
               Logar
              </Button>
        </Col>
        <br/>
        <Col>  {errLogin === true?
            <Alert variant='danger'>Dados necessarios incorretos!</Alert> : null!}
</Col>
    </Col>
    <Card.Title className="text-center">
    <Link to='/newUser'>Registrar novo User!</Link>
    </Card.Title>
    </Row>
        </Container>
        </>
    );
}
export default Login;