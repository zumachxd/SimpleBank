"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAsyncError = (err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(404).json({ message: err.message });
    }
};
exports.default = handleAsyncError;
