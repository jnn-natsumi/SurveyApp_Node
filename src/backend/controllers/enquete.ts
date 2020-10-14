import express, { Router } from 'express'
import { getRepository } from  'typeorm'
import Enquete from '../models/Enquete'

var router: Router = express.Router();

router.post('/', function(req, res) {
    const enquete = req.body;
    const  EnqueteRepository = getRepository(Enquete);
    EnqueteRepository.save(enquete);
    res.send(enquete);
});
router.get('/', async function (req, res) {
    const EnqueteRepository = getRepository(Enquete);
    const enquetes = await EnqueteRepository.find();
    res.send(enquetes);
});
export default router;