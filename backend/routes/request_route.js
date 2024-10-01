import express from "express"
import { acceptrequest, borrowedrequest, declinerequest, lentrequest, pendingitemlist, returncheckrequest, returnrequest } from "../controller/item_controller.js";


const router=express.Router()

router.get('/pending/:lenderId', pendingitemlist);
router.get('/borrowed/:borrowerId',borrowedrequest)
router.get('/lender/:lenderId',lentrequest)
router.post('/accept',acceptrequest)
router.post('/decline',declinerequest)
router.post('/request',returnrequest)
router.post('/checkrequest',returncheckrequest)
export default router