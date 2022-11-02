import { text, urlencoded } from "express"
import Sequelize, { INTEGER } from "sequelize"
import db from "./db"

class Products extends Sequelize.Model{}

Products.init(
    {
        name: { type: Sequelize.DataTypes.STRING,
                allowNull: false,
             },

        color:{type: Sequelize.DataTypes.STRING,
               allowNull: false,
             }, 

        size:{ type: Sequelize.DataTypes.STRING,
            allowNull: false,
             } ,

        price: { type: Sequelize.DataTypes.IntegerDataType
                },

        stock: { type: Sequelize.DataTypes.IntegerDataType
                },
        
        category: { type: Sequelize.DataTypes.STRING,
            allowNull: false,
                   },

        description: {type: S.DataTypes.TEXT,
            allowNull: false,
               },

        imgFront : {type: S.DataTypes.TEXT,
             allowNull: false,
                 },         

        imgback: {type: S.DataTypes.TEXT,
             allowNull: false,
                },

        rating: { type: Sequelize.DataTypes.FloatDataType},
    },
    {sequelize, modelName: "products"});

    module.exports = Products;