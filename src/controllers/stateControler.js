const State = require('../models/stateModel');

exports.addState = async (req, res) => {
    try {
        const states = req.body;

        if (!Array.isArray(states) || states.length === 0) {
            return res.status(400).json({
                message: 'Invalid input, Please provide an array of states'
            });
        }

        const isValid = states.every(state =>
            state.hasOwnProperty('name') &&
            state.hasOwnProperty('population') &&
            state.hasOwnProperty('area')
        );

        if (!isValid) {
            return res.status(400).json({
                message: "Every state should have name, population and area fields!"
            });
        }

        await State.insertMany(states);

        return res.status(201).json({
            message: 'States are successfully added',
            success: true
        });

    } catch (err) {
        console.error("Error adding states:", err);

        if (!res.headersSent) {  // ✅ Prevents multiple responses
            if (err.code === 11000) {
                return res.status(400).json({
                    message: "Duplicate state names"
                });
            }
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
};


exports.getPopulationOfASpecificState = async(req, res) => {
    const stateName = req.params.name.toLowerCase()
    const state = await State.findOne({ name: new RegExp(`^${stateName}$`, 'i') });

    if(state)  {
        res.status(200).json({
            message: "Population Retrived Successfully",
            status: true,
            population: state.population
        })
    } else {
        res.status(404).json({ error: "State not found" });
    }
}

exports.getAllStates = async(req, res) => {
    const states = await State.find()

    res.status(200).json({
        message: "States retrieved successfully",
        status: true,
        states
    })
}

exports.totalPopulationState = async(req, res) => {
    try {
        const result = await State.aggregate([
            {
                $group: {
                    _id: null,
                    totalPopulation: { $sum: "$population"}
                }
            }
        ])

        if(result.length === 0) {
            return res.status(404).json({ error: "No states found" });
        }
    
        res.json({ totalPopulation: result[0].totalPopulation });
    
    } catch {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

exports.averageDensity = async(req, res) => {
    try {
        const states = await State.find({},{name: 1, population: 1, area: 1})
        
        const densities = states.map((state) => {
            if (state.area === 0) {
                return { name: state.name, error: "Area cannot be zero" };
              }
              return {
                name: state.name,
                populationDensity: state.population / state.area,
              };
        })

        res.json({densities})
        
    } catch {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}