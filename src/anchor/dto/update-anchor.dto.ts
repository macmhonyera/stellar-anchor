import { PartialType } from '@nestjs/swagger';
import { CreateAnchorDto } from './create-anchor.dto';

export class UpdateAnchorDto extends PartialType(CreateAnchorDto) {}
