import {
    Body,
    Controller,
    Delete,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDTO } from './dto/create-comment.dto'
import { UpdateCommentDTO } from './dto/update-comment.dto'

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    // remove the 'id' param and change it for the req.user
    @Post(':id')
    async create(
        @Param('id', ParseIntPipe) id: number,
        @Body() createCommentDTO: CreateCommentDTO,
    ) {
        return await this.commentService.create(createCommentDTO, id)
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
