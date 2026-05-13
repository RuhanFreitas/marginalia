import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import type { JwtRequest } from '../types/jwt-request'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../generated/prisma/enums'

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.USER)
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
