import React from 'react';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import api from '../API';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';


const NewUser = () => {
    const [pdwInput, setpwdInput] = useState<string>('');
    const [UserInput, setUserInput] = useState<string>('');
    const [cadastrado, setCadastrado] = useState<boolean>(false);
    const [errCadastro, setErrCadastro] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setUserInput(event.target.value);
    };
    function limparInputs() {
      setUserInput('');
      setpwdInput('');
    }

    const handleChange2 = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setpwdInput(event.target.value);
    };

    const handleClick= async () => {
       try {
        await api.put('/', {passwordHash: pdwInput, username: UserInput});
       }
      catch{ 
         setErrCadastro(true)
         return setTimeout(() => {setErrCadastro(false)}, 2000);
        }
       limparInputs();
       setCadastrado(true);
        setTimeout(() => {setCadastrado(false);
        return navigate('/')}, 2000);
        return 
    }


    return(
      <Container> 
        <Row>
   <Col
   md={{ span: 6, offset: 3 }}
   style={{ width: '18rem' }}
   className="text-center"
   >
    {
   cadastrado? <Alert variant='success'>Conta criada com sucesso!</Alert>
       :    <h1>Cadastre-se Aqui no MageBank</h1>
}
{errCadastro? <Alert variant='danger'>Dados necessarios incorretos!</Alert> : null!}
      
        <Col>
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Seu Username" onChange={ handleChange } />
            </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" placeholder="Password" onChange={ handleChange2 } />
             </Form.Group>
              <Button onClick={ handleClick } variant="outline-dark" size='lg'>
               Cadastrar
              </Button>
        </Col>
              <Link to='/'>
              Ir para o Login 
            </Link>
    </Col>
    </Row>  
    </Container>
    )
}

export default NewUser;
