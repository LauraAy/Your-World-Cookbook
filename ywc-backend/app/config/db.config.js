module.exports = {
    HOST: "https://ec2-3-101-118-14.us-west-1.compute.amazonaws.com/",
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

