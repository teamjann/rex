const Sequelize = require('sequelize');

// change host to process.env.DATABASE_URL

const host =
  'postgres://hkzwzkucvknprt:35517bab8cec74ba83898cc0efe0f35442eac35e2e33bce5b9161df4acc5c89a@ec2-107-20-249-68.compute-1.amazonaws.com:5432/d154edt0e9n1r4';

const sequelize = new Sequelize(host, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

sequelize
  .authenticate()
  .then(() => console.log('connection made'))
  .catch(err => console.log(`cannot connect: ${err}`));

exports.promiseQuery = query => sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

exports.insertQuery = query => sequelize.query(query, { returning: true });

exports.deleteQuery = query => sequelize.query(query, { returning: true });

exports.updateQuery = query =>
  sequelize.query(query, {
    type: sequelize.QueryTypes.UPDATE,
    returning: true,
  });

exports.validateQuery = query => sequelize.query(query, { returning: true });

exports.MODE_PRODUCTION = 'mode_production';
