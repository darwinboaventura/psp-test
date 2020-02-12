import { Connection } from 'typeorm';

export class TestDatabaseUtil {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async cleanDatabase() {
    await this.connection.query('DELETE FROM transaction');
    await this.connection.query('DELETE FROM payable');
  }
}
