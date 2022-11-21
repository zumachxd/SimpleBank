"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("express-async-errors");
const User_control_1 = __importDefault(require("../Controller/User.control"));
const router = (0, express_1.Router)();
const controller = new User_control_1.default();
router.put('/', controller.newUser);
router.get('/', controller.allUsers);
router.post('/', controller.newLogin);
router.get('/balance', controller.getBalance);
router.post('/trade', controller.tradeCash);
router.get('/transaction', controller.getMyTrades);
exports.default = router;
