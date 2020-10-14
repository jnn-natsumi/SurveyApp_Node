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
const message_1 = __importDefault(require("./controllers/message"));
const enquete_1 = __importDefault(require("./controllers/enquete"));
const typeorm_1 = require("typeorm");
const Enquete_1 = __importDefault(require("./models/Enquete"));
const app = express_1.default();
// 追加 サーバの強化追加
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 追加終了
// 追加 処理の外だし
app.use("/messages", message_1.default);
app.use("/api/enquetes", enquete_1.default);
app.use("/", express_1.default.static(__dirname + "/public"));
app.use("*", (req, res) => {
    res.status(200).sendFile(__dirname + "/public/index.html");
});
// 追加終了
!function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield typeorm_1.createConnection({
            type: "postgres",
            url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
            synchronize: true,
            entities: [
                Enquete_1.default,
            ],
            extra: {
                ssl: (!!process.env.DATABASE_SSL) ? {
                    rejectUnauthorized: false,
                } : false,
            }
        });
        // 3000番ポートでAPIサーバ起動
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("ポート" + port + "番で起動したよ〜！");
        });
    });
}();
