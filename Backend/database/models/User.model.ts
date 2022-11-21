import db from '.';
import { Model, INTEGER, STRING  } from 'sequelize';
import Account from './Acc.model';

class User extends Model {
    id!: number;
    username!: string;
    passwordHash!: string;
    accountId!: number;
}

User.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: STRING,
        allowNull: false,
      },
      passwordHash: {
        type: STRING,
        allowNull: false,
},
accountId: {
    type: INTEGER,
    allowNull: false,
    references: {
        model: 'accounts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
     
    }
}, {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
})

 User.belongsTo(Account, { foreignKey: 'accountId', as: 'acc'})

export default User;
