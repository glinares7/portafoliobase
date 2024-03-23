import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('jsonb', { nullable: true })
  user: Record<string, any>;

  @Column({ default: '' })
  token: string;
}
