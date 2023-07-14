import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import mongoose from "mongoose";


export enum Category  {
    ADVENTURE = 'Adventure',
    CLASSICS = 'Classics',
    CRIME = 'Crime',
    FANTASY = 'Fantasy'
}


@Schema({
    timestamps : true
})

export class Book {
    @Prop()
    title : string;

    @Prop()
    description : string;

    @Prop()
    author : string;

    @Prop()
    price: number;

    @Prop()
    category : Category;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref : 'User'})
    user : User;
 
}

export const BookSchema = SchemaFactory.createForClass(Book)