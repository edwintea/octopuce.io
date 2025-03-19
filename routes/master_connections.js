/*
+-----------+-------------+------+-----+-------------------+-------------------+
| Field     | Type        | Null | Key | Default           | Extra             |
+-----------+-------------+------+-----+-------------------+-------------------+
| id        | int         | NO   | PRI | NULL              | auto_increment    |
| Name      | varchar(50) | YES  |     | NULL              |                   |
| Label     | varchar(50) | YES  |     | NULL              |                   |
| link      | text        | YES  |     | NULL              |                   |
| contype   | int         | YES  |     | 1                 |                   |
| status    | tinyint(1)  | YES  |     | 0                 |                   |
| CreatedAt | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| UpdatedAt | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------+-------------+------+-----+-------------------+-------------------+
*/

const express = require('express')
const router = express.Router()
const con = require('../config/database')
const {body,validationResult} = require('express-validator')
const controller=require('../controller/masterConnectionsController')

router.get('/all',controller.getAll)
router.get('/active',controller.getActive)

//post
router.post('/save',[
    body('name').notEmpty(),
    body('label').notEmpty(),
    body('link_image').notEmpty(),
    body('connection_type').notEmpty(),
    body('status').notEmpty()
],controller.save)


//delete
router.delete('/delete',[
    body('id').notEmpty()
],controller.delete)


module.exports=router





