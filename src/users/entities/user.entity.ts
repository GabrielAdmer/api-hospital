import { Hospital } from 'src/hospitales/entities/hospital.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity( 'users' )
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'varchar', length: 128 } )
  name: string;

  @Column( { type: 'varchar', length: 128, unique: true } )
  email: string;

  @Column( { type: 'varchar', length: 128 } )
  password: string;

  @Column( { type: 'varchar', length: 128 } )
  image: string;

  @Column( { type: 'varchar', length: 128, default: 'USER_ROLE' } )
  role: string;

  @Column( { type: 'bool', default: false } )
  google: boolean;

  @OneToMany( () => Hospital, ( hospital ) => hospital.user, { nullable: true } )
  hospitales: Hospital[];
}