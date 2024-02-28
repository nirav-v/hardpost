var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Model, DataTypes, } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';
class User extends Model {
    // instance method for verifying password with
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // only allow passwords between 6 - 30 chars long
            len: [6, 30],
        },
    },
}, {
    hooks: {
        beforeCreate: (newUserData) => __awaiter(void 0, void 0, void 0, function* () {
            newUserData.password = yield bcrypt.hash(newUserData.password, 10);
            // return newUserData; -> pissed off sequelize HookReturn type
        }),
    },
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user',
});
// module.exports = User;
export default User;
