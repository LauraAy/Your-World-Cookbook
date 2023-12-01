module.exports = {
    HOST: "localhost",
    PORT: "5000",
    USER: "lauraay",
    PASSWORD: "4QLpa44!",
    DB: "cookbookdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };