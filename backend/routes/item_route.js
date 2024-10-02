import express from "express"
import { Additem, allitemlisting, cartitem, cartitemlist, checkcartitem, checkRequest, deleteitem, deleteitemlist, edititem, isAvailable, itemdetail, itemlisting, ownerid, pendingitemlist, rentitem, requestitem, updateitem, withoutloginallitemlisting } from "../controller/item_controller.js"

const router=express.Router()
router.post('/additem',Additem)
router.get('/list/:ownerId',itemlisting)
router.post('/delete',deleteitem)
router.get('/allitem/:ownerId',allitemlisting)
router.get('/withloginlistitem',withoutloginallitemlisting)
router.get('/itemdetail/:id',itemdetail)
router.get('/available/:id',isAvailable)
router.post('/rentitem',rentitem)
router.get('/owner/:id',ownerid)
router.get('/:itemId/:lenderId/:borrowerId', checkRequest);
router.post('/cart',cartitem)
router.get('/:user/:item',checkcartitem)
router.get('/:user', cartitemlist);
router.post('/deletebyId',deleteitemlist );
router.get('/pending/:lenderId', pendingitemlist);
router.post('/edititem',edititem)
router.post('/updateitem',updateitem)
export default router;