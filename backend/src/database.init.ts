import { ConfigService } from '@nestjs/config';
import { createConnection } from 'mysql2/promise';

export async function createDatabaseIfNotExists(configService: ConfigService) {
  const connection = await createConnection({
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    user: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
  });

  const databaseName = configService.get<string>('DB_DATABASE');
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);
  await connection.end();
}
