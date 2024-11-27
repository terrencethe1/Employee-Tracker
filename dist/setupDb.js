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
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432", 10),
});
const executeSqlFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = fs_1.default.readFileSync(filePath, "utf-8");
    yield pool.query(sql);
});
const setupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Running schema.sql...");
        yield executeSqlFile(path_1.default.join(__dirname, "../sql/schema.sql"));
        console.log("Running seed.sql...");
        yield executeSqlFile(path_1.default.join(__dirname, "../sql/seed.sql"));
        console.log("Database setup complete!");
    }
    catch (error) {
        console.error("Error setting up the database:", error);
    }
    finally {
        yield pool.end();
    }
});
setupDatabase();
