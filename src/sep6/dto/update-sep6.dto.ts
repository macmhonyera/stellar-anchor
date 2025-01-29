import { PartialType } from '@nestjs/swagger';
import { CreateSep6Dto } from './create-sep6.dto';

export class UpdateSep6Dto extends PartialType(CreateSep6Dto) {}
