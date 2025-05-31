import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'argon2';
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
  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!email) throw new UnauthorizedException('user not found');
    const isPasswordMatch = verify(user.password, password);
    if (!isPasswordMatch) throw new UnauthorizedException('invalid password');
    return { id: user.id, name: user.name };
  }
}
