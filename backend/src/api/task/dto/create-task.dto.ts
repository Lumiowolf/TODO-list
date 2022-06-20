import { IsBoolean, IsDateString, IsUUID,} from 'class-validator';
import {ApiProperty, IntersectionType, PartialType} from "@nestjs/swagger";

export class BasicTaskInfo {
    @ApiProperty()
    name: string;
}

export class AdditionalTaskInfo {
    @ApiProperty()
    @IsDateString()
    deadline: Date;

    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsDateString({}, { each: true })
    reminders: Date[];

    @ApiProperty()
    priority: number;

    @ApiProperty()
    category: string;

    @ApiProperty()
    @IsUUID()
    parentTask: string;

    @ApiProperty()
    @IsBoolean()
    done: boolean;
}

export class CreateTaskDto extends IntersectionType(
    BasicTaskInfo,
    PartialType(AdditionalTaskInfo),
) {}
