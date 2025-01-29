import { PrimaryGeneratedColumn } from 'typeorm';

export class Anchor {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
