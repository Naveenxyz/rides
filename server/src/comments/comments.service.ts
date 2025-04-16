import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({
      relations: ['user'],
    });
  }

  async findBySpot(spotId: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { spotId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTrip(tripId: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { tripId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(commentData: Partial<Comment>): Promise<Comment> {
    const comment = this.commentsRepository.create(commentData);
    return this.commentsRepository.save(comment);
  }

  async update(id: string, commentData: Partial<Comment>): Promise<Comment> {
    await this.commentsRepository.update(id, commentData);
    return this.commentsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.commentsRepository.delete(id);
  }

  async likeComment(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    comment.likes += 1;
    return this.commentsRepository.save(comment);
  }
}