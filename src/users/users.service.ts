import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.find({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log({ id, updateUserDto });
    const toUpdate = await this.userRepository.findOne({ where: { id } });
    console.log({ id, toUpdate });

    const updated = Object.assign(toUpdate, updateUserDto);
    console.log({ id, updated });

    return await this.userRepository.save(updated);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
