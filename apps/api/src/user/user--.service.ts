import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashpassword = await hash(password);
    return this.prisma.users.create({
      data: {
        password: hashpassword,
        ...user,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }
}
