import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, OneToMany} from "typeorm";
import {Category} from "../../category/entities/category.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column("timestamp without time zone", {default: null})
    deadline?: Date;

    @Column({default: null})
    description?: string;

    @Column("timestamp without time zone", {default: null, array: true})
    reminders?: Date[];

    @Column({default: null})
    priority?: number;

    @Column({default: null})
    categoryName?: string;

    @ManyToOne(() => Category, category => category.name, {onDelete: "SET NULL"})
    category?: string;

    @Column({default: null})
    parentTaskId?: string;

    @OneToMany(() => Task, task => task.parentTask)
    childTasks?: string[];

    @ManyToOne(() => Task, task => task.childTasks)
    parentTask?: string;

    @Column({default: false})
    done: boolean;

    @CreateDateColumn()
    creationDate: Date;
}
