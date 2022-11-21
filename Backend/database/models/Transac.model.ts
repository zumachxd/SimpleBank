import db from '.';
import { Model, INTEGER, DATEONLY  } from 'sequelize';
import Account from './Acc.model';

class Transaction extends Model {
    id!: number;
    debitedAccountId!: string;
    credtedAccountId!: string;
    value!: number;
    createdAt!: Date;
}

Transaction.init({
    id:{
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
         },
         value: {
            type: INTEGER,
            allowNull: false,
              }, 
    debitedAccountId: {
        type: INTEGER,
        allowNull: false,   
      }, 
    credtedAccountId: {
        type: INTEGER,
        allowNull: false,
      },
    createdAt: {
        type: DATEONLY,
    
    }  
}, {
    sequelize: db,
    modelName: 'transactions',
    timestamps: false,
})

Transaction.belongsTo(Account, {foreignKey: 'debitedAccountId', as: 'deb' });
Transaction.belongsTo(Account, {foreignKey: 'credtedAccountId', as: 'cred' });

export default Transaction;
