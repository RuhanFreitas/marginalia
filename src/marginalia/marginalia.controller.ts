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
import { CreateMarginaliaDTO } from './dto/create-marginalia.dto'
import { MarginaliaService } from './marginalia.service'
import { UpdateMarginaliaDTO } from './dto/update-marginalia.dto'

@Controller('marginalia')
export class MarginaliaController {
    constructor(private readonly marginaliaService: MarginaliaService) {}

    // change the way of getting the id, instead of param we're getting the id through the req
    @Post(':id')
    async create(
        @Param('id', ParseIntPipe) id: number,
        @Body() createMarginaliaDTO: CreateMarginaliaDTO,
    ) {
        return await this.marginaliaService.create(createMarginaliaDTO, id)
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
