/*
+------------+--------------+------+-----+-------------------+-------------------+
| Field      | Type         | Null | Key | Default           | Extra             |
+------------+--------------+------+-----+-------------------+-------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment    |
| UserId     | int          | YES  | MUL | NULL              |                   |
| ConnectId  | int          | YES  | MUL | NULL              |                   |
| link       | varchar(255) | YES  |     | NULL              |                   |
| ExpireDate | datetime     | YES  |     | NULL              |                   |
| status     | int          | YES  |     | NULL              |                   |
| CreatedAt  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| UpdatedAt  | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------+------+-----+-------------------+-------------------+
*/
const express = require('express')
const router = express.Router()
const con = require('../config/database')
const {body,validationResult} = require('express-validator')
const controller=require('../controller/connectionsController')

router.get('/',controller.get)
router.get('/user/:id',controller.getAllByUserId)
router.get('/user/inactive/:id',controller.getInactiveByUserId)
router.get('/chanel/:chanel_id/:user_id',controller.getChanelAndByUserId)
router.get('/mine/:chanel_id/:user_id',controller.getMineOfChanel)
router.get('/group/:uid',controller.getMineOfGroup)
router.get('/groupnot/:chanel_id/:user_id',controller.getNotMineOfGroup)
router.get('/source/:user_id',controller.GetAsSourceWorkflows)
router.get('/destination/:user_id',controller.GetAsDestinationWorkflows)



//post
router.post('/save',[
    body('userid').notEmpty(),
    body('connect_m_id').notEmpty(),
    body('name').notEmpty(),
    body('state').notEmpty(),
    body('access_url').notEmpty(),
    body('access_token').notEmpty(),
    body('refresh_token').notEmpty(),
    body('expire_date').notEmpty()
],controller.save)


//delete
router.delete('/delete',[
    body('id').notEmpty()
],controller.delete)


module.exports=router

