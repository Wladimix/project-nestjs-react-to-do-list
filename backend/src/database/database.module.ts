import { DatabaseService } from '@database/database.service';
import { Global, Module } from '@nestjs/common';


@Global()
@Module({
	exports: [DatabaseService],
	providers: [DatabaseService]
})
export class DatabaseModule {}
