import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('spot/:spotId')
  findBySpot(@Param('spotId') spotId: string): Promise<Comment[]> {
    return this.commentsService.findBySpot(spotId);
  }

  @Get('trip/:tripId')
  findByTrip(@Param('tripId') tripId: string): Promise<Comment[]> {
    return this.commentsService.findByTrip(tripId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() commentData: Partial<Comment>, @GetUser() user: User): Promise<Comment> {
    // Set the user to the current user
    commentData.userId = user.id;
    return this.commentsService.create(commentData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() commentData: Partial<Comment>,
    @GetUser() user: User,
  ): Promise<Comment> {
    // In a real app, you would check if the user is the author of the comment
    return this.commentsService.update(id, commentData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    // In a real app, you would check if the user is the author of the comment
    return this.commentsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likeComment(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.likeComment(id);
  }
}