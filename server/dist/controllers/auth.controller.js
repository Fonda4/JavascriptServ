"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const logger_service_1 = require("../services/logger.service");
const express_1 = require("express");
exports.authController = (0, express_1.Router)();
logger_service_1.LoggerService.debug("OK auth");
exports.authController.post("/auth/login", (req, res) => {
    logger_service_1.LoggerService.info("[POST] /auth/");
    const { username, password } = req.body;
    if (!username || !password) {
    }
});
