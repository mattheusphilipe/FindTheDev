const parseStringArray = require('../utils/parseStringArray');
const Dev = require('../models/Dev');
module.exports = 
{
    async index(request, response)
    {
        // busca todos os dev nos raio de 10 km
        // filtrar por tecnologias
        console.log(request.query)
        const { latitude, longitude, techs} = request.query;
        const arrayTechs = parseStringArray(techs);
        console.log(arrayTechs)
        try 
        {
            const dev  = await Dev.find(
                {
                    techs: 
                    {
                        $in: arrayTechs,
                    },
                    location: 
                    {
                        $near: 
                        {
                            $geometry: 
                            {
                                type: 'Point',
                                coordinates: [longitude, latitude],
                            },
                            $maxDistance: 10000,
                        }
                    },
                });
        
                return response.json(dev);

        } catch (err) {
            console.log(err.message)
        }
        return response.json({devs: []});
    }
};