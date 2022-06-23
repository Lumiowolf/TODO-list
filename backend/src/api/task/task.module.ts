import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './entities/task.entity';
import {TaskController} from './task.controller';
import {TaskService} from './task.service';
import {CategoryModule} from '../category/category.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        CategoryModule
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {
}
