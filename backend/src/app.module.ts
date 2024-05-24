import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { FilesModule } from './files/files.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TaskModule } from '@tasks/task.module';
import { UsersModule } from '@users/users.module';


import * as path from 'path';


@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env'
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, 'static'),
			serveRoot: '/static/'
		}),
		DatabaseModule,
		TaskModule,
		UsersModule,
		FilesModule
	]
})
export class AppModule {}
