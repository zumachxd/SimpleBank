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
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert('users', [{
                    username: "Zezito",
                    passwordHash: "$2a$10$y7JB.mbq6BBssB/6UR.PpOFeIOwfJEVprp4furctP9qj.lXJdDut6",
                    accountId: 1
                },
                {
                    username: "EdwardElric",
                    passwordHash: "$2a$10$Mmn6R2kWhq4rdR2nKwiQ9uaQMtwm54lcG42fim4Wr2WTlcGxTtAdS",
                    accountId: 2
                }
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('users', null, {});
        });
    }
};
