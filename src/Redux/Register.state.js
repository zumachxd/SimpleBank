"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAtt = exports.attSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.attSlice = (0, toolkit_1.createSlice)({
    name: 'att',
    initialState: {
        att: false,
    },
    reducers: {
        newAtt(state, { payload }) {
            state.att = payload;
        }
    }
});
// Action creators are generated for each case reducer function
exports.newAtt = exports.attSlice.actions.newAtt;
exports.default = exports.attSlice.reducer;
