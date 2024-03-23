import { Emailcliente } from 'src/emailcliente/entities/emailcliente.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Perfilcliente {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ default: '' })
  nombre: string;
  @Column({ default: '' })
  apellido1: string;
  @Column({ default: '' })
  apellido2: string;
  @Column({ default: '' })
  direccion: string;
  @Column({ default: 0 })
  telefono: number;
  @Column({ default: '' })
  genero: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  dataimg: Buffer;

  @Column({ default: '' })
  ext: string;

  @OneToOne(() => Emailcliente, (emailcliente) => emailcliente.perfilcliente)
  emailcliente: Emailcliente;
}
