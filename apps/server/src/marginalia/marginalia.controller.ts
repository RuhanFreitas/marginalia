import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common'
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { MarginaliaService } from './marginalia.service'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'
import type { JwtRequest } from '../types/jwt-request'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../generated/prisma/enums'

@Controller('marginalia')
export class MarginaliaController {
    constructor(private readonly marginaliaService: MarginaliaService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(
        @Body() createMarginaliaDTO: CreateMarginaliaDTO,
        @Req() req: JwtRequest,
    ) {
        return await this.marginaliaService.create(
            createMarginaliaDTO,
            req.user.sub,
        )
    }

    @HttpCode(HttpStatus.OK)
    @Get('/all')
    async findAll() {
        return await this.marginaliaService.findAll()
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async find(@Query('title') title: string) {
        return await this.marginaliaService.find(title)
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.marginaliaService.findById(id)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMarginaliaDTO: UpdateMarginaliaDTO,
    ) {
        return await this.marginaliaService.updateById(updateMarginaliaDTO, id)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.marginaliaService.delete(id)
    }
}
