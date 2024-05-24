import { FilesService } from './files.service';
import { Module, forwardRef } from '@nestjs/common';
import { TaskModule } from '@tasks/task.module';


@Module({
	exports: [FilesService],
	imports: [
		forwardRef(() => TaskModule)
	],
	providers: [FilesService]
})
export class FilesModule {}
