import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnchorService } from './anchor.service';
import { CreateAnchorDto } from './dto/create-anchor.dto';
import { UpdateAnchorDto } from './dto/update-anchor.dto';

@Controller('anchor')
export class AnchorController {
  constructor(private readonly anchorService: AnchorService) {}

  @Post()
  create(@Body() createAnchorDto: CreateAnchorDto) {
    return this.anchorService.create(createAnchorDto);
  }

  @Get()
  findAll() {
    return this.anchorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anchorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnchorDto: UpdateAnchorDto) {
    return this.anchorService.update(+id, updateAnchorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anchorService.remove(+id);
  }
}
