const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    const Genders = sequelize.define('genders', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     primaryKey: true
        // },

    });
};

//ID
//Nombre