import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
  ) {}

  async findAll(): Promise<Trip[]> {
    return this.tripsRepository.find({
      relations: ['creator'],
    });
  }

  async findOne(id: string): Promise<Trip> {
    return this.tripsRepository.findOne({ 
      where: { id },
      relations: ['creator'],
    });
  }

  async create(tripData: Partial<Trip>): Promise<Trip> {
    const trip = this.tripsRepository.create(tripData);
    return this.tripsRepository.save(trip);
  }

  async update(id: string, tripData: Partial<Trip>): Promise<Trip> {
    await this.tripsRepository.update(id, tripData);
    return this.tripsRepository.findOne({ 
      where: { id },
      relations: ['creator'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.tripsRepository.delete(id);
  }

  async incrementRidesCompleted(id: string): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({ where: { id } });
    trip.ridesCompleted += 1;
    return this.tripsRepository.save(trip);
  }

  async updateRating(id: string, newRating: number): Promise<Trip> {
    const trip = await this.tripsRepository.findOne({ where: { id } });
    // Simple average calculation - in a real app, you'd store all ratings and calculate properly
    trip.rating = (trip.rating + newRating) / 2;
    return this.tripsRepository.save(trip);
  }
}