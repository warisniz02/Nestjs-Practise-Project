import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports :[
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.registerAsync({
       inject: [ConfigService],
       useFactory :  (config : ConfigService) => {
         return {
          secret :  config.get<string>('JWT_SECRET_KEY'),
          signOptions : {
            expiresIn : config.get<string | number>('JWT_EXPIRES')
          },
         };
       },
    }),

    MongooseModule.forFeature([{name : 'User', schema : userSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
