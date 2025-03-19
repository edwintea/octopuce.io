/*
+-----------+--------------+------+-----+-------------------+-------------------+
| Field     | Type         | Null | Key | Default           | Extra             |
+-----------+--------------+------+-----+-------------------+-------------------+
| id        | int          | NO   | PRI | NULL              | auto_increment    |
| name      | varchar(255) | YES  |     | NULL              |                   |
| phone     | varchar(50)  | YES  |     | NULL              |                   |
| email     | varchar(255) | YES  |     | NULL              |                   |
| password  | varchar(255) | YES  |     | NULL              |                   |
| CreatedAt | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| UpdatedAt | datetime     | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------+--------------+------+-----+-------------------+-------------------+
*/
const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const controller = require('../controller/userController')

router.get('/',controller.get)

router.post('/save',[
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty()
],controller.save)

router.post('/login',[
    body('email').notEmpty(),
    body('password').notEmpty()
],controller.login)

router.post('/forgot',[body('email').notEmpty()],controller.forgot)

router.delete('/delete',[body('id').notEmpty()],controller.delete)

module.exports=router

