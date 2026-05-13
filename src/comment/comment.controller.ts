import {
    Body,
    Controller,
    Delete,
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
import type { JwtRequest } from '../types/jwt-request'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../guards/roles.guard'
import { Role } from '../generated/prisma/enums'
import { Roles } from '../decorators/roles.decorator'

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post(':id')
    async create(
        @Body() createCommentDTO: CreateCommentDTO,
        @Req() req: JwtRequest,
    ) {
        return await this.commentService.create(createCommentDTO, req.user.sub)
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateComment: UpdateCommentDTO,
    ) {
        return await this.commentService.updateById(updateComment, id)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.commentService.delete(id)
    }
}
