"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("../Services/User.service"));
const Acc_service_1 = __importDefault(require("../Services/Acc.service"));
class UserControl {
    constructor(service = new User_service_1.default(), service2 = new Acc_service_1.default()) {
        this.service = service;
        this.service2 = service2;
        this.newUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, passwordHash } = req.body;
            if (!username || !passwordHash)
                throw new Error('Some required fields are missing');
            const newUser = yield this.service.creatUser(req.body);
            return res.status(201).json(newUser);
        });
        this.newLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newLogin = yield this.service.newLogin(req.body);
            return res.status(200).json(newLogin);
        });
        this.getBalance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token)
                throw new Error(' Token not found');
            const getBalance = yield this.service.getBalance(token);
            return res.status(200).json(getBalance);
        });
        this.allUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.service.getAllUsers();
            return res.status(200).json(allUsers);
        });
        this.tradeCash = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const trade = yield this.service.cashOut(req.body);
            if (!trade)
                throw new Error('Falied Transaction');
            const { cashInId, cashOutId, value } = trade;
            const timeElapsed = Date.now();
            const date = new Date(timeElapsed);
            const teste = yield this.service2.newTransaction(cashOutId, cashInId, value, date);
            return res.status(201).json(teste);
        });
        this.getMyTrades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token)
                throw new Error(' Token not found');
            const trades = yield this.service2.getMyTransactions(token);
            return res.status(200).json(trades);
        });
    }
}
exports.default = UserControl;
;
