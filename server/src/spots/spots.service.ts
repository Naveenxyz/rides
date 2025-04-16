import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './entities/spot.entity';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private spotsRepository: Repository<Spot>,
  ) {}

  async findAll(): Promise<Spot[]> {
    return this.spotsRepository.find();
  }

  async findOne(id: string): Promise<Spot> {
    return this.spotsRepository.findOne({ where: { id } });
  }

  async create(spotData: Partial<Spot>): Promise<Spot> {
    const spot = this.spotsRepository.create(spotData);
    return this.spotsRepository.save(spot);
  }

  async update(id: string, spotData: Partial<Spot>): Promise<Spot> {
    await this.spotsRepository.update(id, spotData);
    return this.spotsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.spotsRepository.delete(id);
  }
}