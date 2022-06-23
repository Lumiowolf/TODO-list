import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from "./dto/create-category.dto";

@Controller('api/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Delete(':name')
    remove(@Param('name') name: string) {
        return this.categoryService.remove(name);
    }
}
