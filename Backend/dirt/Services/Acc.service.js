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
const Transac_model_1 = __importDefault(require("../database/models/Transac.model"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const User_model_1 = __importDefault(require("../database/models/User.model"));
class AccountService {
    constructor() {
        this.trade = Transac_model_1.default;
        this.user = User_model_1.default;
        this.acc = Acc_model_1.default;
    }
    newTransaction(cashOutId, cashInId, value, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const newT = yield this.trade.create({ debitedAccountId: cashOutId, credtedAccountId: cashInId, value, createdAt });
            return newT;
        });
    }
    getMyTransactions(token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const decode = (0, jwt_decode_1.default)(token).email;
            const user = yield this.user.findOne({ where: { username: decode } });
            if (!user)
                throw new Error('User not found');
            const Querry = `SELECT ts.*, us.username, us2.username as usernameDebit FROM transactions AS ts 
       INNER JOIN users AS us ON ts."credtedAccountId" = us.id 
       INNER JOIN users AS us2 ON ts."debitedAccountId" = us2.id
       WHERE ts."debitedAccountId" = ${user.accountId} OR ts."credtedAccountId" = ${user.accountId}`;
            const myT = yield ((_a = this.trade.sequelize) === null || _a === void 0 ? void 0 : _a.query(Querry));
            //  const myT = await this.trade.findAll({ 
            //    where: {
            //      debitedAccountId: user.accountId,
            //            },
            //            include: [{model: this.acc, as: 'cred'},{model: this.acc, as: 'debt'}, this.user   ]
            //                });
            return { myT };
        });
    }
    ;
}
exports.default = AccountService;
;
