import dataSource from '../config/data-source';

class Database {
  static async connect() {
    try {
      await dataSource.initialize();
      console.log('database connected');
      return true;
    } catch (error) {
      console.log('Database connection is failed: ', error);
      return false;
    }
  }
}

export default Database;
