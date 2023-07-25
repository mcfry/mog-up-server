module.exports = {
  development: {
    username: "postgres",
    password: "admin",
    database: "mogup",
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: "0",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: "0",
  },
  production: {
    dialect: "postgres",
    host: process.env.RENDER_INTERNAL_URL,
    port: 5432,
    database: "mog_up_db",
    username: "mdm_maker",
    password: process.env.RENDER_PROD_PASS,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
    operatorsAliases: "0",
  },
};

// For production issues:

// https://community.render.com/t/deploying-node-backend-on-render-and-getting-a-sequelize-and-postgres-connection-error/12736/4

// https://community.render.com/t/ssl-tls-required/1022
