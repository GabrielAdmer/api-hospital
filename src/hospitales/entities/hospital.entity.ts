import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity( 'hospitales' )
export class Hospital {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'varchar', length: 128 } )
  name: string;

  @Column( { type: 'varchar' } )
  image: string;

  @ManyToOne( () => User, ( user ) => user.hospitales )
  user: User;

}