import { Body, Controller, Delete, Get, Patch, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import type { JwtRequest } from '../types/jwt-request'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findMyself(@Req() req: JwtRequest) {
        return await this.userService.findMyself(req.user.sub)
    }

    @Patch()
    async updateMyself(
        @Body() updateUserDTO: UpdateUserDTO,
        @Req() req: JwtRequest,
    ) {
        return await this.userService.updateMyself(req.user.sub, updateUserDTO)
    }

    @Delete()
    async delete(@Req() req: JwtRequest) {
        return await this.userService.delete(req.user.sub)
    }
}
