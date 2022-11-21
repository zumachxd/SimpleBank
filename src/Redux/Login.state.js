"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUser = exports.userSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: {
        user: '',
        token: '',
    },
    reducers: {
        changeUser(state, { payload }) {
            state.user = payload.user;
            state.token = payload.token;
        }
    }
});
// Action creators are generated for each case reducer function
exports.changeUser = exports.userSlice.actions.changeUser;
exports.default = exports.userSlice.reducer;
