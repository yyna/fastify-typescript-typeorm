import {
    CreateDateColumn,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from '../user/entity'

@Entity()
export class Memo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 20, nullable: false })
    title: string

    @Column({ type: 'varchar', length: 1000, nullable: false })
    content: string

    @ManyToOne((type) => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
