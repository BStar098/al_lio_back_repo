const S = require("sequelize");
const db = require("../db/config");

class User extends S.Model {
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    direccion: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
    genre: {
      type: S.STRING,
      allowNull: false,
    },

    type: {
      type: S.STRING,
      allowNull: false,
    },
    address: { type: S.STRING, allowNull: false },
    credits: { type: S.INTEGER, allowNull: false },
  },

  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate((user) => {
  user.salt = bcrypt.genSaltSync();

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});
module.exports = User;
