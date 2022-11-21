import { Router } from "express";
import 'express-async-errors';
import UserControl from "../Controller/User.control";

const router = Router();
const controller = new UserControl();

router.put('/', controller.newUser);
router.get('/', controller.allUsers);
router.post('/', controller.newLogin);
router.get('/balance', controller.getBalance);
router.post('/trade', controller.tradeCash);
router.get('/transaction', controller.getMyTrades);

export default router;
