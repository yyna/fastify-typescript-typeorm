import {
    CreateDateColumn,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: false })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
}
