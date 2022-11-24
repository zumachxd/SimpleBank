import UserService from "../Services/User.service";
import { Request, Response } from 'express';
import AccountService from "../Services/Acc.service";


export default class UserControl {
    constructor(
         private service = new UserService(),
         private service2 = new AccountService()
         ) { }

 public newUser = async (req: Request, res: Response) => {
    const { username, passwordHash } = req.body;

    if(!username || !passwordHash) throw new Error('Some required fields are missing')

         const newUser = await this.service.creatUser(req.body);
    
        return res.status(201).json(newUser);
      };

 public newLogin = async (req: Request, res: Response) => {
  const newLogin = await this.service.newLogin(req.body);

  return res.status(200).json(newLogin);
 };
 
 public getBalance = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) throw new Error(' Token not found');
    const getBalance = await this.service.getBalance(token);
    return res.status(200).json(getBalance)
 }

 // ROTA DE TESTES GET//

 public allUsers = async (req: Request, res: Response) => {
    const allUsers = await this.service.getAllUsers();
    return res.status(200).json(allUsers)
 }
 
 public tradeCash = async (req: Request, res: Response) => {
    const trade = await this.service.cashOut(req.body);
    if(!trade) throw new Error('Falied Transaction');
    const {cashInId, cashOutId, value } = trade
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    const teste = await this.service2.newTransaction(cashOutId, cashInId, value, date );


    return res.status(201).json(teste);
 };
 public getMyTrades = async (req: Request, res: Response) => {
   const token= req.headers.authorization;
   if (!token) throw new Error(' Token not found');
   const trades = await this.service2.getMyTransactions(token);

   return res.status(200).json(trades);
 };
 
};
