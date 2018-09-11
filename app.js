const line = require('@line/bot-sdk');
const express = require('express');
const JSONParseError = require('@line/bot-sdk').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed
const { Pool } = require('pg')

const send = require('./responses');
const userData = require('./users')
const wilayah = require('./wilayah')


const pool = new Pool({
    user: 'postgres',
    host: '178.128.211.90',
    database: 'dca_chatbot1',
    password: 'DCA2018',
    port: 5432,
})


const config = {
    channelAccessToken: "JsTp25WVXUhk9IyFnJU+tTpKwAKLCUANnc6EX+LAw2m1XB0sGFCVTTUjQNYq9ofQz8GeCqxBC2BG2nsF2Pf2S5p8PCnyWi8dN4/iQiAi/oBMD/NQN2W5qnl4xOFMANjJUW3qtzUwCR0P2oVAY8IlvQdB04t89/1O/w1cDnyilFU=",
    channelSecret: "712eef71436211aec7c24b02a94c9803",
};

const client = new line.Client(config);
const app = express();
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


const EVENT_TYPE = {
    MESSAGE: "message",
    TEXT: "text"
}


async function handleEvent(event) {
    try {
        let lineID = event.source.userId;

        if (event.type !== EVENT_TYPE.MESSAGE || event.message.type !== EVENT_TYPE.TEXT) {
            if (event.type === "follow") {
                send.reponseJoin(client, event.replyToken);
            } else {
                return Promise.resolve(null);
            }
        }

        let userRegistered = await userData.checkUser(pool, lineID)
        if (userRegistered === false) {
            let msgResp = "Anda belum terdaftar, silahkan mendaftar sebagai relawan untuk melanjutkan rekap suara"
            let inputText = (event.message.text);
            switch (inputText) {
                default:
                    if (inputText.startsWith("DAFTAR")) {
                        if (inputText.split(/\r\n|\r|\n/).length === 4) {
                            let userDataChat = inputText.split(/\r\n|\r|\n/);
                            let nama = userDataChat[1];
                            let alamat = userDataChat[2];
                            let phone = userDataChat[3]
                            await userData.insertUser(pool, lineID, nama, alamat, phone);
                            send.reponseSuksesDaftar(client, event.replyToken)
                        }
                    } else if (inputText.startsWith("INFO") || inputText.startsWith("line://")) {
                        // ignore
                    }
                    else send.defaultResponseNotRegistered(client, event.replyToken);
                    break;
                case "JOIN":
                    send.reponseMenuDaftar(client, event.replyToken)
            }
        } else {
            let inputText = event.message.text;
            switch (inputText) {
                default:
                    if (inputText.startsWith("PROVINSI_")) {
                        let provid = inputText.split("_")[1]
                        let kabs = await wilayah.getKabkot(pool, provid);
                        send.sendKabs(client, event.replyToken, kabs)
                    } else if (inputText.startsWith("KABKOT_")) {
                        let kecid = inputText.split("_")[1];
                        let kecs = await wilayah.getKec(pool, kecid);
                        console.log(kecid)
                        console.log(kecs)
                        send.sendKecs(client, event.replyToken, kecs);
                    } else if (inputText.startsWith("KECAMATAN_")) {
                        let kelid = inputText.split("_")[1];
                        let kels = await wilayah.getKeldes(pool, kelid);
                        console.log(kelid)
                        console.log(kels)
                        send.sendKeldes(client, event.replyToken, kels);
                    } else if (inputText.startsWith("KELDES_")) {
                        let kelid = inputText.split("_")[1];
                        let tpss = await wilayah.getTps(pool, kelid);
                        console.log(kelid)
                        console.log(tpss)
                        send.sendTpss(client, event.replyToken, tpss);
                    } else if (inputText.startsWith("TPS_")) {
                        let tpsid = inputText.split("_")[1];
                        let tpsExist = await wilayah.tpsdetail(pool, tpsid);
                        if (tpsExist === false) {
                            //todo 
                        } else {
                            let tpsname = await wilayah.tpsname(pool, tpsid, tpsExist['name'])
                            console.log(tpsname);
                            send.tpsAction(client, event.replyToken, tpsname)
                        }
                    } else if (inputText.startsWith("INFO")) {
                        // ignore
                    }
                    else {
                        send.defaultResponseRegistered(client, event.replyToken, userRegistered['fullname']);
                    }
                    break;
                case "REPORT":
                    let provinces = await wilayah.getAllProvince(pool);
                    console.log(provinces)
                    send.sendProvinces(client, event.replyToken, provinces)
                    break
            }

        }
    } catch (error) {
        console.log("error", error)
        const rsp = {
            type: EVENT_TYPE.TEXT,
            text: "Terjadi kesalahan pada server"
        };
        return client.replyMessage(event.replyToken, rsp);
    }
}


app.use((err, req, res, next) => {
    if (err instanceof SignatureValidationFailed) {
        res.status(401).send(err.signature)
        return
    } else if (err instanceof JSONParseError) {
        res.status(400).send(err.raw)
        return
    }
    next(err)
})



const port = 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

