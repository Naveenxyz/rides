import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get('GOOGLE_CLIENT_ID'),
    );
  }

  async validateGoogleToken(token: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: this.configService.get('GOOGLE_CLIENT_ID'),
      });
      
      const payload = ticket.getPayload();
      
      if (!payload) {
        return null;
      }
      
      return {
        email: payload.email,
        name: payload.name,
        googleId: payload.sub,
        avatar: payload.picture,
      };
    } catch (error) {
      console.error('Google token validation error:', error);
      return null;
    }
  }

  async googleLogin(token: string) {
    const googleUser = await this.validateGoogleToken(token);
    
    if (!googleUser) {
      throw new Error('Invalid Google token');
    }
    
    const user = await this.usersService.findOrCreateGoogleUser(googleUser);
    
    return this.generateToken(user);
  }

  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }
}