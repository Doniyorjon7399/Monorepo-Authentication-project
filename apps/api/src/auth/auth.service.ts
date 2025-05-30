import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-auth.dto';
import { UserService } from 'src/user/user--.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new ConflictException('user already existed');
    return await this.userService.create(createUserDto);
  }
}
