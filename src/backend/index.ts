import express from 'express'
import messageController from './controllers/message'
import enqueteController from './controllers/enquete'
import {createConnection} from 'typeorm'

import Enquete from './models/Enquete'

const app: express.Express = express()

// 追加 サーバの強化追加
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 追加終了

// 追加 処理の外だし
app.use("/messages", messageController)
app.use("/api/enquetes", enqueteController)
app.use("/", express.static(__dirname + "/public"))
app.use("*", (req, res) => {
    res.status(200).sendFile(__dirname + "/public/index.html");
});
// 追加終了

!async function initialize(){
    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
        synchronize: true,
        entities: [
            Enquete,
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
    console.log("ポート" + port + "番で起動したよ〜！")
})
}()