import Account from "../database/models/Acc.model";
import jwt_decode from "jwt-decode";
import { cashTrade, decode } from "../Util/interface";
import bcript from 'bcryptjs';
import User from "../database/models/User.model";
import  tokenGenerator  from "../Util/JWT"
import creatUserValidate from "../Util/joi/joiValidate";

export default class UserService {
    private user;
    private acc;

    constructor() {
        this.user = User;
        this.acc = Account;
        }

    public async creatUser(user: User) {
        const { username, passwordHash } = user;
        await creatUserValidate(user);
        const password = bcript.hashSync(passwordHash, 10);
        const newAcc = await this.acc.create({
            balance: 100,
        })
        if(!newAcc) throw new Error('Account not created')
            const newUser = await this.user.create({
            username, passwordHash: password, accountId: newAcc.id
        });

        return newAcc;
    };

    public async newLogin(user: User) {
        const { username, passwordHash } = user;
        const dbUser = await this.user.findOne({ where: { username } });
         if (!dbUser) throw new Error('Wrong password or username');
        const verify = await bcript.compare(passwordHash, dbUser.passwordHash)
         if (!verify) throw new Error('Wrong password or username');
        const token = tokenGenerator.tokenGenerator(username);
         return token;
    };

    public async cashOut({ cashOutId, cashInId, value }: cashTrade) {
        const userCashOut = await this.user.findOne({ where: { username: cashOutId } });
        const userCashIn = await this.user.findOne({ where: { username: cashInId } });
         if(!userCashOut || !userCashIn) throw new Error("Account not found")
           const accCashOut = await this.acc.findOne({ where: { id: userCashOut.accountId } });
           const accCashIn = await this.acc.findOne({ where: { id: userCashIn.accountId } });
         if(!accCashOut || !accCashIn) throw new Error("Account not found")
         if(accCashOut.balance < value) throw new Error("Insufficient funds");
             await this.acc.decrement({ balance: value }, { where: { id: userCashOut.accountId } });
             await this.acc.increment({ balance: value }, { where: { id: userCashIn.accountId } });   
  
  return {
    cashInId: userCashIn.accountId,
    cashOutId: userCashOut.accountId,
    value
  }
};



    public async getAllUsers() {
        const allUsers = await this.user.findAll()
        return allUsers;
    }

    public async getBalance(token: string) {
        const decode = jwt_decode<decode>(token).email
        const user = await this.user.findOne({ where: { username:decode } })
        if(!user) throw new Error('User not found');
    const balance = await this.acc.findOne({where: { id: user.accountId } })
        
        return balance;
      }

      

};
