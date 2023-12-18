// comment model should contain text and authorId of user who writes the comment
// const { Sequelize, Model, DataTypes } = require("sequelize");
// const sequelize = require("../config/database.js");
import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Comment extends Model {}

Comment.init(
  {
    commentText: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    timestamps: false,
    underscored: false,
    modelName: "comment", // We need to choose the model name
  }
);

// module.exports = Comment;
export default Comment;
