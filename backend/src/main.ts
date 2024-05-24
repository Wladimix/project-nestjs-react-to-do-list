import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';


async function serverStart() {
	const PORT = process.env.SERVER_PORT || 3001;
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	await app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}

serverStart();
