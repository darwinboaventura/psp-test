import { Connection } from 'typeorm';

export class TestUtil {
  connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async cleanDatabase() {
    return await Promise.all([
      this.connection.query('DELETE FROM transaction'),
      this.connection.query('DELETE FROM payable'),
    ]);
  }
}
