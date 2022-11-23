import Account from "../database/models/Acc.model";
import Transaction from "../database/models/Transac.model";
import jwt_decode from "jwt-decode";
import { decode } from "../Util/interface";
import User from "../database/models/User.model";


export default class AccountService {
  private trade;
  private user;
  

    constructor() {
      this.trade = Transaction;
      this.user = User;
    }

    public async newTransaction( cashOutId: number, cashInId:number, value: number, createdAt: Date ) {
      const newT = await this.trade.create({ debitedAccountId: cashOutId, credtedAccountId: cashInId, value, createdAt });
   return newT;
    }

    public async getMyTransactions(token: string) {
      const decode = jwt_decode<decode>(token).email;
      const user = await this.user.findOne({ where: { username:decode } })
      if(!user) throw new Error('User not found');
       const Querry = `SELECT ts.*, us.username, us2.username as usernameDebit FROM transactions AS ts 
       INNER JOIN users AS us ON ts."credtedAccountId" = us.id 
       INNER JOIN users AS us2 ON ts."debitedAccountId" = us2.id
       WHERE ts."debitedAccountId" = ${user.accountId} OR ts."credtedAccountId" = ${user.accountId}`
       const myT = await this.trade.sequelize?.query(Querry)
      return {myT};
    };




};
