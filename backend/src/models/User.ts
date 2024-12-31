import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare name: string;
  declare surname: string;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "email",
        msg: "Email is already in use"
      },
      validate: {
        isEmail: true,
        notNull: {
          msg: "Email is required"
        },
        isUnique: async (value: string, next: Function) => {
          const user = await User.findOne({ where: { email: value } });
          if (user) {
            return next(new Error("Email is already in use"));
          }
          next();
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "Password must be between 1 and 100 characters long"
        },
        notNull: {
          msg: "Password is required"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required"
        },
        notNull: {
          msg: "Name is required"
        }
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Surname is required"
        },
        notNull: {
          msg: "Surname is required"
        }
      }
    },
  },
  {
    tableName: "users",
    sequelize: sequelize,
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// User.hasMany(League, {foreignKey: 'creatorUserId'});
// User.hasMany(Match, { foreignKey: 'refereeUserId' });
// User.hasMany(Player, { foreignKey: 'usersId' });
// User.hasMany(Team, { foreignKey: 'creatorUserId' });

export default User;