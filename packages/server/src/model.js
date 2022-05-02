import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize("sqlite:./data/food.sqlite");
class FoodItem extends Model {}
class User extends Model {}

FoodItem.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    imageMedium: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
  }
);

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    newsletter: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
  }
);

await sequelize.sync();

export { FoodItem };
export { User };
