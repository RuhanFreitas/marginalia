import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'
import { UpdateUserDTO } from './dto/update-user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO) {
        return await this.userService.create(createUserDTO)
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findById(id)
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDTO: UpdateUserDTO,
    ) {
        return await this.userService.updateById(id, updateUserDTO)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.delete(id)
    }
}
