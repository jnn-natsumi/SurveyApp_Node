import express from 'express'
import messageController from './controllers/message'
import enqueteController from './controllers/enquete'
import loginController from './controllers/login'
import { createConnection } from 'typeorm'

import Enquete from './models/Enquete'

const app: express.Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/messages", messageController)
app.use("/api/enquetes", enqueteController)
app.use("/api/login", loginController)
app.use("/", express.static(__dirname + "/public"))
// app.get('*', (req, res) => {
//     res.status(200).sendFile(__dirname + "/public/index.html");
// });

!async function initialize() {
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
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log("ポート" + port + "番で起動しました〜〜！")
    })
}()