/*
+-----------+--------------+------+-----+-------------------+-------------------+
| Field     | Type         | Null | Key | Default           | Extra             |
+-----------+--------------+------+-----+-------------------+-------------------+
| id        | int          | NO   | PRI | NULL              | auto_increment    |
| userid    | int          | YES  | MUL | NULL              |                   |
| name      | varchar(255) | YES  |     | NULL              |                   |
| CreatedAt | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| UpdatedAt | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------+--------------+------+-----+-------------------+-------------------+
*/
const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const controller = require('../controller/templatesController')

router.get('/',controller.get)
router.get('/user/:id',controller.getAllByUserId)
router.get('/user/size/:id/:size',controller.GetSizeByUserId)
router.post('/rename/:id',controller.rename)


//post
router.post('/save',[
    body('userid').notEmpty(),
    body('name').notEmpty(),
    body('category').notEmpty(),
    body('size').notEmpty()
],controller.save)

//delete
router.delete('/delete',[
    body('id').notEmpty()
],controller.delete)


module.exports=router

