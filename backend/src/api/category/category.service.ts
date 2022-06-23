import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateCategoryDto} from './dto/create-category.dto';
import {Category} from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {
    }

    async create(createTaskDto: CreateCategoryDto): Promise<void> {
        try {
            await this.categoryRepository.insert(createTaskDto);
        } catch (QueryFailedError) {
            throw new HttpException('Category unique constraint violated', HttpStatus.BAD_REQUEST);
        }
    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    findOne(name: string): Promise<Category> {
        return this.categoryRepository.findOneBy({name: name});
    }

    async remove(name: string): Promise<void> {
        await this.categoryRepository.delete(name);
    }
}
