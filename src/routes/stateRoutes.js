const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {addState, getPopulationOfASpecificState, getAllStates} = require('../controllers/stateControler')

router.post('/', authMiddleware, addState)
router.get('/:name/population', authMiddleware, getPopulationOfASpecificState)
router.get('/', authMiddleware, getAllStates)

module.exports = {statesRouter: router}