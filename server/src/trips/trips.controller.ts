import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { Trip } from './entities/trip.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() tripData: Partial<Trip>, @GetUser() user: User): Promise<Trip> {
    // Set the creator to the current user
    tripData.creatorId = user.id;
    return this.tripsService.create(tripData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() tripData: Partial<Trip>,
    @GetUser() user: User,
  ): Promise<Trip> {
    // In a real app, you would check if the user is the creator or has admin privileges
    return this.tripsService.update(id, tripData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    // In a real app, you would check if the user is the creator or has admin privileges
    return this.tripsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/complete')
  markAsCompleted(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.incrementRidesCompleted(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/rate')
  rateTrip(
    @Param('id') id: string,
    @Body() data: { rating: number },
  ): Promise<Trip> {
    return this.tripsService.updateRating(id, data.rating);
  }
}