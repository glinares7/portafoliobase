import { Perfil } from 'src/perfil/entities/perfil.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  userpass: string;

  @Column({ default: 'USER' })
  role: string;

  @Column({ default: 1 })
  state: number;

  @Column({ default: '' })
  encrypt: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP AT TIME ZONE America/Lima',
  })
  updatedAt: Date;

  @OneToOne(() => Perfil)
  @JoinColumn()
  perfil: Perfil;
}
