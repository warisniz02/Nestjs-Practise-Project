import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps : true
})

export class User {
    @Prop()
    name : string;

    @Prop({unique :[true, 'Duplicate email entered!!']})
    email : string;

    @Prop()
    passowrd : string;
}

export const userSchema = SchemaFactory.createForClass(User);   