import React, { useEffect } from 'react';
import api from '../API';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from './mago.png';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../Redux/Login.state';
import { Button, Card, Col, InputGroup, Row, Image} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import Trades from './Trades';
import { newAtt } from '../Redux/Register.state';


const HomePage = () => {
    const user = useSelector((state:RootState) => state.user);
    const [balanceD, setBalanceD] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');
    const [valueInput, setValueInput] = useState<number>(0);
    const att = useSelector((state:RootState) => state.att)


    const dispatch = useDispatch();
    const navigate = useNavigate();


     useEffect(() => {
          api.get('/balance', {headers: { authorization: user.token}} )
          .then(({ data }) => {
            setBalanceD(data.balance)
          })
     }, [att]);

     const handleChange1 = ( event: React.ChangeEvent<HTMLInputElement> ) => {
         return setUserInput(event.target.value);
    };

    const handleChange2 = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        return setValueInput(Number(event.target.value));
    };

    const handleClick = async () => {
        if(!valueInput) return alert(" O Valor digitado não é um numero");
      try { 
        await api.post('/trade', {cashInId: userInput, cashOutId: user.user, value: valueInput });
        } catch { return alert("Erro na transação!"); }
              return dispatch(newAtt(!att.att))
         }

    const logOffClick = async () => {
        dispatch(changeUser({ user: '', token: '' }));
        return navigate('/');
    }     

    return (
        <>
            <Card
            bg='dark'
            text='white'
            >
                <Col md={{ span: 1, offset: 5 }}>
                              <Image width={300} src={img}/>
                 </Col>

            <Card.Header>
                <Col md={{ span: 1, offset: 5 }}>
               <Card.Title>MageBank</Card.Title> 
                <Card.Title>Ola {user.user}!</Card.Title>
                </Col>
            </Card.Header>
            <Col>
            <Card.Title>Saldo Atual: {balanceD} </Card.Title>
            </Col>
            </Card>
            <Row>
                <Col xs={{ order: 'first' }}>
           <Card style={{ width: '44rem' }} >
            <br />
            <Card.Header>
             <Card.Title> Transação rapida </Card.Title>
              <InputGroup>
                <InputGroup.Text id="basic-addon1">Valor</InputGroup.Text>
                <Form.Control
                onChange={ handleChange2 }
                 placeholder="0"
                 aria-label="0"
                 aria-describedby="basic-addon1"
                />
                <Form.Control
                onChange={ handleChange1 }
                placeholder="Username que vai receber!"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Text id="basic-addon2">Username </InputGroup.Text>
                </InputGroup>
                <Button variant='outline-dark' onClick={ handleClick }> Realizar Trade</Button>

            </Card.Header>
            <Button variant='outline-dark' onClick={ logOffClick }> Deslogar </Button>
        </Card>
        </Col>
        <Col >
        <Card style={{ width: '30rem' }}>
            <Card.Header> Transações recentes </Card.Header>
            <Trades/>
        </Card>
        </Col>
        </Row>
        </>
    );
}

export default HomePage;