import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { UsersService } from '@users/users.service';


@Controller('users')
export class UsersController {

	constructor(private readonly userService: UsersService) {}

	@Post('/registration')
	registration(@Body() createUserDto: Prisma.UserCreateInput) {
		return this.userService.registration(createUserDto);
	}

	@Post('/login')
	login(@Req() req: Request) {
		return this.userService.login(req.body);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
		return this.userService.update(+id, updateUserDto);
	}

}
