const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {addDistrict, deleteDistrict, getAllDistricts, updateDistrictPopulation} = require('../controllers/districtController')

router.post('/', authMiddleware, addDistrict)
router.delete('/:name', authMiddleware, deleteDistrict)
router.get('/', authMiddleware, getAllDistricts)
router.put('/:name', authMiddleware, updateDistrictPopulation)

module.exports = {districtRouter: router}