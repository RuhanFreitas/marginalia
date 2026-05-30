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
    Req,
    UseGuards,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDTO } from './dto/create-comment.dto'
import { UpdateCommentDTO } from './dto/update-comment.dto'
import type { JwtRequest } from '../../common/types/jwt-request'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Role } from '../../generated/prisma/enums'

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get(':id/comments')
    async getComments(@Param('id', ParseIntPipe) id: number) {
        return await this.commentService.getComments(id)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(
        @Body() createCommentDTO: CreateCommentDTO,
        @Req() req: JwtRequest,
    ) {
        return await this.commentService.create(createCommentDTO, req.user.sub)
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateComment: UpdateCommentDTO,
        @Req() req: JwtRequest,
    ) {
        return await this.commentService.updateById(
            updateComment,
            id,
            req.user.sub,
        )
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN, Role.USER)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: JwtRequest,
    ) {
        return await this.commentService.delete(id, req.user.sub)
    }
}
