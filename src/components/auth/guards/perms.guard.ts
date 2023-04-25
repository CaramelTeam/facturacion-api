import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PUBLIC_ROUTE } from '../../../constants/index';


@Injectable()
export class PermsGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const public_perm = this.reflector.get(PUBLIC_ROUTE, context.getHandler());
    if (public_perm){
      return true;
    }
    return this.canActivate(context);
  }
}
