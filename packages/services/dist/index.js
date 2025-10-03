"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = exports.razorpayService = exports.databaseService = exports.storageService = exports.storage = exports.db = exports.auth = exports.firebaseApp = void 0;
// Firebase configuration
var config_1 = require("./firebase/config");
Object.defineProperty(exports, "firebaseApp", { enumerable: true, get: function () { return __importDefault(config_1).default; } });
Object.defineProperty(exports, "auth", { enumerable: true, get: function () { return config_1.auth; } });
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return config_1.db; } });
Object.defineProperty(exports, "storage", { enumerable: true, get: function () { return config_1.storage; } });
// Authentication service
__exportStar(require("./auth/authService"), exports);
__exportStar(require("./database/databaseService"), exports);
__exportStar(require("./storage/storageService"), exports);
__exportStar(require("./blog/blogService"), exports);
__exportStar(require("./types/auth"), exports);
__exportStar(require("./types/blog"), exports);
// Storage service
var storageService_1 = require("./storage/storageService");
Object.defineProperty(exports, "storageService", { enumerable: true, get: function () { return storageService_1.storageService; } });
// Database service
var databaseService_1 = require("./database/databaseService");
Object.defineProperty(exports, "databaseService", { enumerable: true, get: function () { return databaseService_1.databaseService; } });
// Payment service
var razorpayService_1 = require("./payment/razorpayService");
Object.defineProperty(exports, "razorpayService", { enumerable: true, get: function () { return razorpayService_1.razorpayService; } });
// Booking service
var bookingService_1 = require("./scheduling/bookingService");
Object.defineProperty(exports, "bookingService", { enumerable: true, get: function () { return bookingService_1.bookingService; } });
//# sourceMappingURL=index.js.map