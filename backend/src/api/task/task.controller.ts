import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ParseBoolPipe} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get('main-tasks')
    findMainTasks() {
        return this.taskService.findMainTasks();
    }

    @Get('sub-tasks/:pid')
    findSubTasks(@Param('pid', ParseUUIDPipe) parentId: string) {
        return this.taskService.findSubTasks(parentId);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.taskService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Patch("set-done/:id/:status")
    setDone(@Param('id', ParseUUIDPipe) id: string, @Param('status', ParseBoolPipe) status: boolean) {
        return this.taskService.setDone(id, status);
    }

    // @Patch("set-undone/:id")
    // setUndone(@Param('id', ParseUUIDPipe) id: string) {
    //     return this.taskService.setDone(id, false);
    // }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.taskService.remove(id);
    }
}
