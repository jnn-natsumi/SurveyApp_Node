import express, { Router } from 'express'
import { getRepository } from  'typeorm'
import Enquete from '../models/Enquete'
import axios from 'axios'
const GOOGLE_URL_USERINFO = 'https://www.googleapis.com/oauth2/v3/userinfo'
const ADMIN_MAIL = "nf.sakana20@gmail.com"

var router: Router = express.Router();

router.post('/', async function (req, res) {
    const enquete = req.body;
    const EnqueteRepository = getRepository(Enquete);
    await EnqueteRepository.save(enquete);
    res.send(enquete);
});
router.get('/', async function (req, res) {
    const userInfoResponse = await axios.get(GOOGLE_URL_USERINFO, {
        headers: {
            'Authorization': `Bearer ${req.header("Authorization")}`,
        }
    });
    if (ADMIN_MAIL != userInfoResponse.data.email) {
        res.status(401).send()
        return;
    }
    const EnqueteRepository = getRepository(Enquete);
    const enquetes = await EnqueteRepository.find();
    res.send(enquetes);
});
export default router;