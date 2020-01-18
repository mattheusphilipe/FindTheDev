// Responsável por receber a requisição processar e devolver uma resposta
const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringArray = require('../utils/parseStringArray');
// index lista de fevs, show apenas 1
// index, show, store, update, destroy

module.exports = {

    async index(request, response)
    {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response)
    {
        const { github_username, techs, latitude, longitude} = request.body;
        console.log(github_username, techs, latitude, longitude)

        const dev = await Dev.findOne({github_username});

        if (!dev)
        {
            try {
                const apiResponse  = await axios.get(`https://api.github.com/users/${github_username}`)
                const { data: {name = login , avatar_url, bio} } = apiResponse;
                const techsArray = parseStringArray(techs)
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                } ;   
                const dev = await Dev.create(
                {
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location,
                });
                return response.json(dev);
    
            } catch (err) {
                console.log(err);
            }
        }

        //console.log(name, avatar_url, bio);
       
        return response.json({message: 'Hello wold'});
    }
}