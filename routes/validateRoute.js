import { express } from "express";
import { Router } from "express";

const router = Router()

import {root , forget} from '../controllers/sessionOps' 

router.get('/root', root);
router.get('/forget', forget)

export {router as RouterSession}