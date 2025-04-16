import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { googleId } });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async findOrCreateGoogleUser(userData: {
    email: string;
    name: string;
    googleId: string;
    avatar?: string;
  }): Promise<User> {
    // First try to find by Google ID
    let user = await this.findByGoogleId(userData.googleId);
    
    // If not found, try by email
    if (!user) {
      user = await this.findByEmail(userData.email);
      
      // If user exists but doesn't have Google ID, update it
      if (user) {
        user.googleId = userData.googleId;
        user.avatar = userData.avatar || user.avatar;
        return this.usersRepository.save(user);
      }
      
      // If user doesn't exist at all, create new
      return this.createUser({
        ...userData,
        emailVerified: true, // Google already verified the email
      });
    }
    
    return user;
  }
}