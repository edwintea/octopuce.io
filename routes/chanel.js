const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const controller = require('../controller/chanelController')

/*
FLOW AUTH :
Authorization_code -> generate token (valid 30d) ->refresh_token(valid 1 year)
*/

router.get('/',controller.auth)
router.get('/oauth/:chanel/:state',controller.auth)
router.get('/callback/:chanel',controller.callback)
router.post('/refresh_token/:chanel/:state',controller.refresh_token)
router.post('/token_update/:state',controller.token_update)
router.post('/rename/:id',controller.chanel_rename)


module.exports=router

