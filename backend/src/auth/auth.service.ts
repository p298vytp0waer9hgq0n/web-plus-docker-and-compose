import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signup(createUserDto: CreateUserDto) {
    const passwd = createUserDto.password;
    const hash = passwd ? bcrypt.hashSync(passwd, 10) : '';
    return await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
  }

  async validatePasswd({ password, username }: SigninUserDto) {
    // const user = await this.usersService.findOneByName(username);
    const user = await this.usersRepository.findOne({
      select: ['id', 'password'],
      where: { username },
    });
    if (user) {
      const match = bcrypt.compareSync(password, user.password);
      if (match) return user;
    }
    return null;
  }
}
