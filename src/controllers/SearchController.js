const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(req, res) {
        // Buscar todos os devs em raio de 10km
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);
        const dev = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000
                },
            }
        });

        return res.json({ dev });
    }
}