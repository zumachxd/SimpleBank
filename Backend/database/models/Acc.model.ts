import db from '.';
import { Model, INTEGER } from 'sequelize';

class Account extends Model {
    id!: number;
    balance!: number;
}

Account.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    balance: {
    type: INTEGER,
    allowNull: false,
    }
}, {
    sequelize: db,
    modelName: 'accounts',
    timestamps: false,
})

export default Account;