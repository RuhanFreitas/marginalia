import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import type { JwtRequest } from '../../common/types/jwt-request'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Role } from '../../generated/prisma/enums'

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @HttpCode(HttpStatus.OK)
    @Get()
    async findMyself(@Req() req: JwtRequest) {
        return await this.userService.findMyself(req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @HttpCode(HttpStatus.OK)
    @Patch()
    async updateMyself(
        @Body() updateUserDTO: UpdateUserDTO,
        @Req() req: JwtRequest,
    ) {
        return await this.userService.updateMyself(req.user.sub, updateUserDTO)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @HttpCode(HttpStatus.OK)
    @Delete()
    async delete(@Req() req: JwtRequest) {
        return await this.userService.delete(req.user.sub)
    }
}
