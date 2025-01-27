import { Injectable } from '@nestjs/common';
import { CreateAnchorDto } from './dto/create-anchor.dto';
import { UpdateAnchorDto } from './dto/update-anchor.dto';

@Injectable()
export class AnchorService {
  create(createAnchorDto: CreateAnchorDto) {
    return 'This action adds a new anchor';
  }

  findAll() {
    return `This action returns all anchor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} anchor`;
  }

  update(id: number, updateAnchorDto: UpdateAnchorDto) {
    return `This action updates a #${id} anchor`;
  }

  remove(id: number) {
    return `This action removes a #${id} anchor`;
  }
}
