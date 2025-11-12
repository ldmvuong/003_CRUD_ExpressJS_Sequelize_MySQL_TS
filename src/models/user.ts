import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address!: string;
  public phoneNumber!: string;
  public gender!: boolean;
  public image!: string;
  public roleId!: string;
  public positionId!: string;

  static associate(models: any) {
    // define relations here
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  User.init(
    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: dataTypes.STRING,
      password: dataTypes.STRING,
      firstName: dataTypes.STRING,
      lastName: dataTypes.STRING,
      address: dataTypes.STRING,
      phoneNumber: dataTypes.STRING,
      gender: dataTypes.BOOLEAN,
      image: dataTypes.STRING,
      roleId: dataTypes.STRING,
      positionId: dataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
