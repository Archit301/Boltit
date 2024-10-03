import express from "express"
import { acceptrequest, allborroweditem, borrowedrequest, checkRequest, declinerequest, getAllItemsDefault, getItemsByCategoryAndSort, lentitemrequest, lentrequest, pendingitemlist, returncheckrequest, returnrequest } from "../controller/item_controller.js";
import { searchNearbyUsers } from "../controller/auth_controller.js";



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
router.post('/default',getItemsByCategoryAndSort)
router.post('/search', searchNearbyUsers);
export default router