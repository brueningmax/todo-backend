import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { queries } from './query';

dotenv.config();

let database = process.env.DB_NAME

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `./${database}.db`,
  });

sequelize.sync()

async function executeQueries() {
    for (const query of queries) {
      try {
        await sequelize.query(query);
        console.log('Query executed successfully:', query);
      } catch (error) {
        console.error('Error executing query:', query);
        console.error(error);
      }
    }
  }
  
executeQueries()
