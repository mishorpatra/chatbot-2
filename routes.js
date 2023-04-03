const express = require('express')
const { sendMessages, initiateClient } = require('./controller/chatController.js')

const Router = express.Router()


//initiate client api
Router.post('/initiate', initiateClient)
//message sending messages
Router.post('/send/messages', sendMessages)

module.exports = Router