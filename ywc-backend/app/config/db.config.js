module.exports = {
    HOST: "ubuntu@ec2-13-56-140-174.us-west-1.compute.amazonaws.com",
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