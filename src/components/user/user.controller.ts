import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ClassSerializerInterceptor, UseInterceptors, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermsGuard } from '../auth/guards/perms.guard';
import { PublicRoute } from '../auth/decorators';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @PublicRoute()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('email')
  findByEmail( @Body('email') email: string ) {
    return this.userService.findByEmail(email);
  }
  
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Patch(':id')
  @UsePipes(new ValidationPipe({whitelist: true}))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  
  @Delete(':id') 
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('email')
  // findByEmail(@Req() request: Request) {
  //   return this.userService.findByEmail(request.body.email);
  // }
  
}
