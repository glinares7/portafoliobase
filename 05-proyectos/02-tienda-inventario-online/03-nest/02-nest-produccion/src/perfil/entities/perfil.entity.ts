import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: '' })
  firstname: string;

  @Column({ default: '' })
  surname: string;

  @Column({ default: '' })
  lastname: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: 'Elija un genero' })
  gender: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  photo: string;

  @OneToOne(() => User, (user) => user.perfil)
  user: User;
}
