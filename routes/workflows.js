/*
+-----------------------+-------------+------+-----+-------------------+-------------------+
| Field                 | Type        | Null | Key | Default           | Extra             |
+-----------------------+-------------+------+-----+-------------------+-------------------+
| id                    | int         | NO   | PRI | NULL              | auto_increment    |
| UserId                | int         | YES  | MUL | NULL              |                   |
| Name                  | varchar(50) | YES  |     | NULL              |                   |
| PublishMode           | tinyint(1)  | YES  |     | 0                 |                   |
| status                | int         | YES  |     | NULL              |                   |
| SourceType            | varchar(50) | YES  |     | NULL              |                   |
| SourceMediaType       | varchar(50) | YES  |     | NULL              |                   |
| SourceConnection      | varchar(50) | YES  |     | NULL              |                   |
| SourcePlaylist        | varchar(50) | YES  |     | NULL              |                   |
| SourceVideoType       | varchar(50) | YES  |     | NULL              |                   |
| SourceFolder          | varchar(50) | YES  |     | NULL              |                   |
| SourceAction          | varchar(50) | YES  |     | NULL              |                   |
| DestinationConnection | varchar(50) | YES  |     | NULL              |                   |
| DestinationPlaylist   | varchar(50) | YES  |     | NULL              |                   |
| DestinationFolder     | varchar(50) | YES  |     | NULL              |                   |
| CreatedAt             | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| UpdatedAt             | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-----------------------+-------------+------+-----+-------------------+-------------------+
*/
const express = require('express')
const router = express.Router()
const con = require('../config/database')
const {body} = require('express-validator')
const controller= require('../controller/workflowsController')


router.get('/',controller.get)
router.get('/user/:id',controller.getAllByUserId)
router.get('/user/inactive/:id',controller.getInactiveByUserId)


//post
router.post('/save',[
    body('userid').notEmpty(),
    body('name').notEmpty(),
    body('publish_mode').notEmpty(),
    body('status').notEmpty(),  
    body('source_id').notEmpty(), // id from connections
    body('source_type').notEmpty(),
    body('source_media_ype').notEmpty(),
    body('source_connection').notEmpty(),
    body('source_playlist').notEmpty(),
    body('source_video_type').notEmpty(),
    body('source_folder').notEmpty(),
    body('source_action').notEmpty(),
    body('destination_id').notEmpty(), // id from connections
    body('destination_type').notEmpty(),
    body('destination_media_ype').notEmpty(),
    body('destination_connection').notEmpty(),
    body('destination_playlist').notEmpty(),
    body('destination_video_type').notEmpty(),
    body('destination_folder').notEmpty(),
    body('destination_action').notEmpty(),
],controller.save)


//delete
router.delete('/delete',[
    body('id').notEmpty()
],controller.delete)


module.exports=router

