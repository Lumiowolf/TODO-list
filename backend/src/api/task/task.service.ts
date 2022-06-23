import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entities/task.entity';
import {CategoryService} from "../category/category.service";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
        private readonly categoryService: CategoryService
    ) {
    }

    async create(createTaskDto: CreateTaskDto): Promise<void> {
        if (await this.categoryService.findOne(createTaskDto.category).then(result => result === null)) {
            throw new HttpException('Unknown category', HttpStatus.BAD_REQUEST);
        }
        await this.tasksRepository.insert(createTaskDto);
    }

    findAll(): Promise<Task[]> {
        return this.tasksRepository.find({order: {creationDate: "DESC"}});
    }

    findMainTasks() {
        return this.tasksRepository.findBy({
            parentTaskId: IsNull()
        });
    }

    findSubTasks(parentId: string) {
        return this.tasksRepository.findBy({
            parentTaskId: parentId
        })
    }

    findOne(id: string): Promise<Task> {
        return this.tasksRepository.findOneBy({
            id: id
        });
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
        await this.tasksRepository.update(
            {id: id},
            updateTaskDto,
        )
    }

    async setDone(id: string, status: boolean) {
        let updateTask = new UpdateTaskDto();
        updateTask.done = status;
        await this.update(id, updateTask);
    }

    async remove(id: string): Promise<void> {
        await this.tasksRepository.delete(id);
    }
}
