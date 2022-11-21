'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield queryInterface.createTable('users', {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                passwordHash: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    field: 'password_hash'
                },
                accountId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    field: 'account_id',
                    references: {
                        model: 'accounts',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                }
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield queryInterface.dropTable('users');
        });
    }
};
