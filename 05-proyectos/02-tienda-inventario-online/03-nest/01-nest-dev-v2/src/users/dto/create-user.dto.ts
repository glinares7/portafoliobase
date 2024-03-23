// import {  PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  // @PrimaryGeneratedColumn()
  id: number;

  firsName: string;

  lastName: string;

  isActive: boolean;
}
