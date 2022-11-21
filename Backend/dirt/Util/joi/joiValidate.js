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
const joi_1 = __importDefault(require("joi"));
const creatUserValidate = (unknow) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(3).required(),
        passwordHash: joi_1.default.string().min(8).pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)).required(),
    });
    const { error } = schema.validate(unknow);
    if (error)
        throw error;
});
exports.default = creatUserValidate;
