"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const sequelize_1 = require("sequelize");
const Acc_model_1 = __importDefault(require("./Acc.model"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    value: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    debitedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    credtedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DATEONLY,
    }
}, {
    sequelize: _1.default,
    modelName: 'transactions',
    timestamps: false,
});
Transaction.belongsTo(Acc_model_1.default, { foreignKey: 'debitedAccountId', as: 'deb' });
Transaction.belongsTo(Acc_model_1.default, { foreignKey: 'credtedAccountId', as: 'cred' });
exports.default = Transaction;
