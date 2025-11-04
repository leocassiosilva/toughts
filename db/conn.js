const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodetoughts', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

try{
    sequelize.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso!');
}catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
}
module.exports = sequelize;