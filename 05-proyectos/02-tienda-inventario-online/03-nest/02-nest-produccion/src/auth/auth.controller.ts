import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { TokenAuthDto } from './dto/token-auth.dto.';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/:id')
  create(@Param('id') id: string, @Body() createAuthDto: CreateAuthDto) {
    return this.authService.signAuth(+id, createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
  @Get('login/all/:id')
  async findOneUser(
    @Param('id') id: number,
    // @Param('token') token: string,
    @Headers() header: TokenAuthDto,
  ) {
    const { authorization } = header;

    console.log('authorization header back', authorization);

    return this.authService.findOneUser(id, authorization);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
