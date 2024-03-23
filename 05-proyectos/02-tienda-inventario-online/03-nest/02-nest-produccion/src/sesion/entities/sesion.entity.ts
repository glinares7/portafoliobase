import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sesion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: 0 })
  idUser: number;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  session: string;
}
