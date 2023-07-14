import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"
import { User } from "../../auth/schema/user.schema"

export class updateBookDto {
    @IsOptional()
    @IsString()
    readonly title : string;

    @IsOptional()
    @IsString()
    readonly description : string;

    @IsOptional()
    @IsString()
    readonly author : string;

    @IsOptional()
    @IsNumber()
    readonly price : number;

    @IsOptional()
    @IsEnum(Category, {message : 'Please enter correct category'})    
    readonly category : Category;

      
    @IsEmpty({message: 'You cannot pass user Id'})
    readonly user: User;

}