import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('spots')
export class Spot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('float')
  distance: number;

  @Column('float')
  rating: number;

  @Column('int')
  popularity: number;

  @Column('simple-array')
  images: string[];

  @Column('simple-json')
  location: {
    latitude: number;
    longitude: number;
  };

  @Column('simple-array')
  tags: string[];

  @OneToMany(() => Comment, comment => comment.spot)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}