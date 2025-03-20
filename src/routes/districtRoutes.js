const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {addDistrict, deleteDistrict, getAllDistricts, updateDistrictPopulation, StatesWithDistricts} = require('../controllers/districtController')

router.post('/', authMiddleware, addDistrict)
router.delete('/:name', authMiddleware, deleteDistrict)
router.get('/', authMiddleware, getAllDistricts)
router.put('/:name', authMiddleware, updateDistrictPopulation)
router.get('/with-states', authMiddleware, StatesWithDistricts)

module.exports = {districtRouter: router}