import React, { useEffect } from 'react';
import api from '../API';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../Redux/store';
import Table from 'react-bootstrap/Table';
import { Button, Col } from 'react-bootstrap';


const Trades = () => {
    const user = useSelector((state:RootState) => state.user);
    const newAtt = useSelector((state:RootState) => state.att)
    const [trades, setTrades] = useState<Array<any>>([])
    const [date, setDate] = useState<string|undefined>(undefined)
    const [tradesFil, setTradesFil] = useState<Array<any>>([])

     useEffect(() => {
         api.get('/transaction', {headers: { authorization: user.token}} )
        .then(({ data }) => {
            setTrades(data.myT[0]);
         })
    }, [newAtt.att] );

    useEffect(() => {
      api.get('/transaction', {headers: { authorization: user.token}} )
     .then(({ data }) => {
         setTradesFil(data.myT[0]);
      })
 }, [] );

    const handleChange2 = ( event: React.ChangeEvent<HTMLInputElement> ) => {
      return setDate(event.target.value);
  };

    const handleClick = () =>{
     const filter = trades.filter((ele) =>  ele.usernamedebit === user.user );
      return setTradesFil(filter) ;
    }

    const handleClick2 = () =>{
      const filter = trades.filter((ele) =>  ele.username === user.user );
       return setTradesFil(filter);
     }
 
     const handleClick3 = () =>{
       return setTradesFil(trades);
     }

     const handleClick4 = () =>{
      const filter = trades.filter((ele) => ele.createdAt === date  );
      if(filter) return  setTradesFil(filter);
       return null;
     }

    return(
        <>
         <Button variant='outline-dark' onClick={ handleClick3 } > Todas </Button>
        <Button variant='outline-dark' onClick={ handleClick } > Debitadas</Button>
            <Button variant='outline-dark' onClick={ handleClick2 } > Creditadas</Button>
            <Col>
                 <input onChange={handleChange2} type='date'/>
            <Button variant='outline-dark' onClick={ handleClick4 }> Buscar por data</Button>
            </Col>
        <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Data</th>
          <th>Creditado</th>
          <th>Debitado</th>
          <th> R$ </th>
        </tr>
      </thead>
      <tbody>
      {tradesFil.map((ele) =>
        <tr>
          <td> {ele.createdAt} </td>
          <td>{ele.username}</td>
          <td>{ele.usernamedebit}</td>
          <td>{ele.value}</td>
        </tr>
        )}
      </tbody>
    </Table>
    </>
    );
}
export default Trades;
