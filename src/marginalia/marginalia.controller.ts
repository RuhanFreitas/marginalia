import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
} from '@nestjs/common'
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { MarginaliaService } from './marginalia.service'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'
import type { JwtRequest } from '../types/jwt-request'

@Controller('marginalia')
export class MarginaliaController {
    constructor(private readonly marginaliaService: MarginaliaService) {}

    // change the way of getting the id, instead of param we're getting the id through the req
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

    @Get('/all')
    async findAll() {
        return await this.marginaliaService.findAll()
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.marginaliaService.findById(id)
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMarginaliaDTO: UpdateMarginaliaDTO,
    ) {
        return await this.marginaliaService.updateById(updateMarginaliaDTO, id)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.marginaliaService.delete(id)
    }
}
