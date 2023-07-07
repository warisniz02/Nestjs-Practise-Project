import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs'
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel  : Model<User>,
        private jwtService : JwtService
    ) {}

    async signUp(signUpDto: SignUpDto){
        const {name, email, password} = signUpDto;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user  = await this.userModel.create({
            name,
            email,
            password : hashedPassword
        });

        const token = this.jwtService.sign({id: user._id})
          return {token};
    }

}
