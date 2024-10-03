import express from "express"
import { acceptrequest, allborroweditem, borrowedrequest, checkRequest, declinerequest, lentitemrequest, lentrequest, pendingitemlist, returncheckrequest, returnrequest } from "../controller/item_controller.js";



const router=express.Router()
router.get('/:itemId/:lenderId/:borrowerId', checkRequest);
router.get('/pending/:lenderId', pendingitemlist);
router.get('/borrowed/:borrowerId',borrowedrequest)
router.get('/lender/:lenderId',lentrequest)
router.post('/accept',acceptrequest)
router.post('/decline',declinerequest)
router.post('/request',returnrequest)
router.post('/checkrequest',returncheckrequest)
router.get('/lentitemrequest/:lenderId',lentitemrequest)
router.get('/borrow/:borrowerId',allborroweditem)
export default router