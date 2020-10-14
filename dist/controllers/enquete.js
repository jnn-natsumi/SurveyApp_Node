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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Enquete_1 = __importDefault(require("../models/Enquete"));
var router = express_1.default.Router();
router.post('/', function (req, res) {
    const enquete = req.body;
    const EnqueteRepository = typeorm_1.getRepository(Enquete_1.default);
    EnqueteRepository.save(enquete);
    res.send(enquete);
});
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const EnqueteRepository = typeorm_1.getRepository(Enquete_1.default);
        const enquetes = yield EnqueteRepository.find();
        res.send(enquetes);
    });
});
exports.default = router;
