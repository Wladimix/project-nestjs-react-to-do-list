import * as bcrypt from 'bcryptjs';

import { DatabaseService } from '@database/database.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {

	constructor(private readonly databaseService: DatabaseService) {}

	public async registration(registrationUserDto: Prisma.UserCreateInput) {
		for (let userField in registrationUserDto) {		
			if (!registrationUserDto[userField])			
				throw new HttpException('одно или несколько полей не заполнены', HttpStatus.BAD_REQUEST);
		}

		const user = await this.findOneByLogin(registrationUserDto.login);
		if (user) {
			throw new HttpException('пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
		}

		const hashPassword = await bcrypt.hash(registrationUserDto.password, 5);
		const newUser = await this.create({ ...registrationUserDto, password: hashPassword });
		return newUser;
	}

	private async findOneByLogin(login: string) {
		return this.databaseService.user.findFirst({
			where: { login }
		});
	}

	private async create(createUserDto: Prisma.UserCreateInput) {
		return this.databaseService.user.create({ data: createUserDto });
	}

	public async login({ login, password }: LoginUserDto) {
		const user = await this.validateUser(login, password);
		return user;
	}

	private async validateUser(login: string, password: string) {
		const user = await this.findOneByLogin(login);
		if (!user) {
			throw new UnauthorizedException({ message: 'такого пользователя не существует' });
		}
		const passwordEquals = await bcrypt.compare(password, user.password);
		if (user && passwordEquals) {
			return user;
		}
		throw new UnauthorizedException({ message: 'неверный пароль' });
	}

	public async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
		const user = await this.findOneById(id);
		if (!user) {
			throw new HttpException('пользователя с данным id не найдено', HttpStatus.BAD_REQUEST);
		}
		return this.databaseService.user.update({
			where: { id },
			data: { ...updateUserDto, password: user.password }
		});
	}

	private async findOneById(id: number) {
		return this.databaseService.user.findFirst({
			where: { id }
		});
	}

}
