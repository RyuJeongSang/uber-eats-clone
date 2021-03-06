import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserResolver } from './users.resolver';
import { UserSerVice } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UserResolver, UserSerVice],
  exports: [UserSerVice],
})
export class UsersModule {}
