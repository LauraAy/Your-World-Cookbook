module.exports = {
    HOST: "ywcdb.cjo8ekeogu3z.us-west-1.rds.amazonaws.com",
    PORT: "3306",
    USER: "admin",
    PASSWORD: "YWCdb1564",
    DB: "ywcdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

