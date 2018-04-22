const Sequelize = require('sequelize');

// change host to process.env.DATABASE_URL

const host = `postgres://cweicgpabdtjhg:f29d128c28622c3861240d4e18e3fe0f02dff49a11d49dc02f962137973bc22f@ec2-54-243-213-188.compute-1.amazonaws.com:5432/d1dqjsl382dfk3`;
//  || {
//   database: "rex",
//   username: "Mike",
//   password: null,
//   dialect: "postgres"
// };

const sequelize = new Sequelize(host, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

sequelize
  .authenticate()
  .then(() => console.log("connection made"))
  .catch((err) => console.log(`cannot connect: ${err}`));

exports.promiseQuery = query =>
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

exports.insertQuery = query => sequelize.query(query, { returning: true });

exports.deleteQuery = query => sequelize.query(query, { returning: true });

exports.updateQuery = query =>
  sequelize.query(query, {
    type: sequelize.QueryTypes.UPDATE,
    returning: true
  });

exports.validateQuery = query => sequelize.query(query, { returning: true });

exports.MODE_PRODUCTION = 'mode_production';
