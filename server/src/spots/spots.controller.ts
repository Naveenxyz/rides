import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { Spot } from './entities/spot.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Get()
  findAll(): Promise<Spot[]> {
    return this.spotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Spot> {
    return this.spotsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() spotData: Partial<Spot>, @GetUser() user: User): Promise<Spot> {
    // In a real app, you might want to check if the user has admin privileges
    return this.spotsService.create(spotData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() spotData: Partial<Spot>,
    @GetUser() user: User,
  ): Promise<Spot> {
    // In a real app, you might want to check if the user has admin privileges
    return this.spotsService.update(id, spotData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    // In a real app, you might want to check if the user has admin privileges
    return this.spotsService.remove(id);
  }
}