import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';


const prisma = new PrismaClient();
const seed = async () => {
	await prisma.task.deleteMany();
	await prisma.user.deleteMany();
	await prisma.user.create(
		{
			data: {
				name: 'Владимир',
				surName: 'Максимов',
				login: 'user',
				password: String(await bcrypt.hash('111', 5)),
				tasks: {
					create: [
						{
							title: 'Освоить "TypeScript"',
							description: 'Для того, чтобы было проще осваивать NestJS, необходимо ознакомиться с TypeScript.',
							status: 'COMPLETED'
						},
						{
							title: 'Пробежаться по курсам по фреймворку NestJS',
							description: 'NestJS - довольно интересный для изучения инструмент. Перед тем, как приступить к выполнению тестового задания, было бы неплохо изучить особенности архитектуры, на которой пишутся серверные приложения с использованием этого фреймворка.',
							status: 'COMPLETED'
						},
						{
							title: 'Изучить Prisma ORM',
							description: 'В ТЗ говорится об использовании объектно-реляционного отображения Prisma ORM. Нужно в целом почитать об ORM и найти какие-нибудь материалы, касающиеся конкретно этого инструмента.',
							status: 'COMPLETED'
						},
						{
							title: 'Познакомиться с технологией WebSockets',
							description: 'Задание должно быть выполнено с использованием вебсокетов. При дублировании вкладок браузера CRUD операции с основной сущностью должны происходить в режиме реального времени синхронно на других вкладках.',
							status: 'COMPLETED'
						},
						{
							title: 'Подумать, на чём будет написана клиентская часть',
							description: 'Раз уж в основе серверной части будет TypeScript, резонней будет подумать, какой инструмент использовать для создания фронтенда также в связке с TypeScript.',
							status: 'COMPLETED'
						},
						{
							title: 'Написать приложение Real Time To-Do-List',
							description: '',
							status: 'COMPLETED'
						}
					]
				}
			}
		}
	);
}

seed().catch((err) => {
	console.warn("Ошибка при заполнении БД фиктивными данными: \n", err);
});
