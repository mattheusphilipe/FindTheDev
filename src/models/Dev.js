// representação de entidades que queremos cadastrar no banco

const { Schema, model } = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere', // eixo x e y 
    }
});

module.exports = model('Dev', DevSchema);

