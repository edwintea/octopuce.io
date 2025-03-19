/*
+--------------+----------+------+-----+-------------------+-------------------+
| Field        | Type     | Null | Key | Default           | Extra             |
+--------------+----------+------+-----+-------------------+-------------------+
| id           | int      | NO   | PRI | NULL              | auto_increment    |
| UserId       | int      | YES  | MUL | NULL              |                   |
| notes        | text     | YES  |     | NULL              |                   |
| link         | text     | YES  |     | NULL              |                   |
| CalendarDate | char(10) | YES  |     | NULL              |                   |
| CalendarTime | char(8)  | YES  |     | NULL              |                   |
| CreatedAt    | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| UpdatedAt    | datetime | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+--------------+----------+------+-----+-------------------+-------------------+
*/

const express = require('express')
const router = express.Router()
const con = require('../config/database')
const {body} = require('express-validator')
const controller = require('../controller/calendarController')

const table="calendars"

router.get('/',controller.get)

//post
router.post('/save',[
    body('userid').notEmpty(),
    body('notes').notEmpty(),
    body('link').notEmpty(),   
    body('start_date').notEmpty(),
    body('start_time').notEmpty(),
    body('end_date').notEmpty(),
    body('end_time').notEmpty()
],controller.save)


//delete
router.delete('/delete',[
    body('id').notEmpty()
],controller.delete)


module.exports=router

