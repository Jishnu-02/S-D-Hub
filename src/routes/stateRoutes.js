const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {addState, getPopulationOfASpecificState, getAllStates, totalPopulationState, averageDensity} = require('../controllers/stateControler')

router.post('/', authMiddleware, addState)
router.get('/:name/population', authMiddleware, getPopulationOfASpecificState)
router.get('/', authMiddleware, getAllStates)
router.get('/total-population', authMiddleware, totalPopulationState)
router.get('/average-density', authMiddleware, averageDensity)
module.exports = {statesRouter: router}