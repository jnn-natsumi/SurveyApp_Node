"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var message_1 = __importDefault(require("./controllers/message"));
var app = express_1.default();
// 追加 サーバの強化追加
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 追加終了
// 追加 処理の外だし
app.use("/messages", message_1.default);
// 追加終了
// 3000番ポートでAPIサーバ起動
app.listen(3000, function () {
    console.log('ポート3000番で起動したよ！！');
});
