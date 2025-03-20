const District = require('../models/districtModel')
const State = require('../models/stateModel');

exports.addDistrict = async(req, res) => {
    
    try {
        const {name, population, state_id} = req.body
        
        if (!name || !population || !state_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const stateExists = await State.findById(state_id)
        if (!stateExists) {
            return res.status(400).json({ error: "Invalid state_id. State does not exist." });
        }

        const existingDistrict = await District.findOne({ name });
        if (existingDistrict) {
            return res.status(400).json({ error: "District already exists" });
        }

        const district = new District({ name, population, state_id });

        await district.save();

        res.status(201).json({
            message: "District added successfully",
            district,
        });

    } catch(err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.deleteDistrict = async(req, res) => {
    try {
        const districtName = req.params.name

        const deletedDistrict = await District.findOneAndDelete({name: districtName})

        if (!deletedDistrict) {
            return res.status(404).json({ error: "District not found" });
        }

        res.json({ message: "District deleted successfully", deletedDistrict });
    } catch(err) {        
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.getAllDistricts = async(req, res) => {
    try {
        const allDistricts = await District.find()

        res.status(200).json({
            allDistricts,
            success: true
        })
    } catch {
        res.status(500).json('Internal server error')
    }
}

exports.updateDistrictPopulation = async(req, res) => {
    try {
        const districtName = req.params.name
        const {population} = req.body
    
        if(!population || isNaN(population) || population <= 0) {
            return res.status(400).json({
                error: "Invalid population value"
            })
        }

        const updatedDistrict = await District.findOneAndUpdate(
            {name: districtName},
            {population},
            {new: true}
        )

        if(!updatedDistrict) res.status(404).json({
            message: "District not found"
        })

        res.json({
            updatedDistrict
        })
    } catch(err) {
        console.log(err);
        
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.StatesWithDistricts = async(req, res) => {
    try {
        const result = await District.aggregate([
            {
              $lookup: {
                from: "states",
                localField: "state_id",
                foreignField: "_id",
                as: "stateDetails"
              }
            },
            {
              $unwind: "$stateDetails" 
            }
          ]);
      
          res.json({ districts: result });
    } catch {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}