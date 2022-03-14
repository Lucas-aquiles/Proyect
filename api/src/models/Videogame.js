const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      allowNull: false,
      primaryKey: true

    },
    rating: {
      type: DataTypes.INTEGER
    }, // cuidado con el numero , puede ser decimal
    platforms: {
      type: DataTypes.STRING,
      allowNull: false

    },
    createdInBd: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
      // me sirve para buscar los videos juegos creados para base de datos
    }

  });
};

// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating

// Plataformas*