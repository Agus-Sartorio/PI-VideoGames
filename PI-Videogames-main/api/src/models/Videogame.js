const { DataTypes , NOW } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING,
      /* default: NOW, */
    },
    rating: {
      type: DataTypes.STRING
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdInDb: {  // esto sirve para cuando quiera crear un personaje y quiera distinguirlo de los que no estan en la db
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};

/* ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas * */

/* https://api.rawg.io/api/games?key=1e3889c41b0049f2b108f6054483daf4 */
