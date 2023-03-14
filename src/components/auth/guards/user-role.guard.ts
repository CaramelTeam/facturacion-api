import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector //Ve informacion de los decoradores, metadata o metodos
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get('roles', context.getHandler() );
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if ( !user ) throw new BadRequestException('No user found');
    console.log(user);
    

    return true;
  }
}
