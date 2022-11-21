"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const sequelize_1 = require("sequelize");
const Acc_model_1 = __importDefault(require("./Acc.model"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    passwordHash: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    accountId: {
        type: sequelize_1.INTEGER,
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
    sequelize: _1.default,
    modelName: 'users',
    timestamps: false,
});
User.belongsTo(Acc_model_1.default, { foreignKey: 'accountId', as: 'acc' });
exports.default = User;
