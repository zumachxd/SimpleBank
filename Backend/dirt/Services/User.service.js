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
const Acc_model_1 = __importDefault(require("../database/models/Acc.model"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_model_1 = __importDefault(require("../database/models/User.model"));
const JWT_1 = __importDefault(require("../Util/JWT"));
const joiValidate_1 = __importDefault(require("../Util/joi/joiValidate"));
class UserService {
    constructor() {
        this.user = User_model_1.default;
        this.acc = Acc_model_1.default;
    }
    creatUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, passwordHash } = user;
            yield (0, joiValidate_1.default)(user);
            const password = bcryptjs_1.default.hashSync(passwordHash, 10);
            const newAcc = yield this.acc.create({
                balance: 100,
            });
            if (!newAcc)
                throw new Error('Account not created');
            const newUser = yield this.user.create({
                username, passwordHash: password, accountId: newAcc.id
            });
            return newAcc;
        });
    }
    ;
    newLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, passwordHash } = user;
            const dbUser = yield this.user.findOne({ where: { username } });
            if (!dbUser)
                throw new Error('Wrong password or username');
            const verify = yield bcryptjs_1.default.compare(passwordHash, dbUser.passwordHash);
            if (!verify)
                throw new Error('Wrong password or username');
            const token = JWT_1.default.tokenGenerator(username);
            return token;
        });
    }
    ;
    cashOut({ cashOutId, cashInId, value }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCashOut = yield this.user.findOne({ where: { username: cashOutId } });
            const userCashIn = yield this.user.findOne({ where: { username: cashInId } });
            if (!userCashOut || !userCashIn)
                throw new Error("Account not found");
            const accCashOut = yield this.acc.findOne({ where: { id: userCashOut.accountId } });
            const accCashIn = yield this.acc.findOne({ where: { id: userCashIn.accountId } });
            if (!accCashOut || !accCashIn)
                throw new Error("Account not found");
            if (accCashOut.balance < value)
                throw new Error("Insufficient funds");
            yield this.acc.decrement({ balance: value }, { where: { id: userCashOut.accountId } });
            yield this.acc.increment({ balance: value }, { where: { id: userCashIn.accountId } });
            return {
                cashInId: userCashIn.accountId,
                cashOutId: userCashOut.accountId,
                value
            };
        });
    }
    ;
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.user.findAll();
            return allUsers;
        });
    }
    getBalance(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decode = (0, jwt_decode_1.default)(token).email;
            const user = yield this.user.findOne({ where: { username: decode } });
            if (!user)
                throw new Error('User not found');
            const balance = yield this.acc.findOne({ where: { id: user.accountId } });
            return balance;
        });
    }
}
exports.default = UserService;
;
