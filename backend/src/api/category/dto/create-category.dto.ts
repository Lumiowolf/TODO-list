import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @MinLength(1)
    name: string;
}
