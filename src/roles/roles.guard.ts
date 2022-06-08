import { CanActivate, mixin, ExecutionContext, Type, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import RequestWithUser from "src/auth/requestWithUser.interface";
import Role from "./enum/role.enum";

/*const RoleGuard = ( role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context : ExecutionContext){
      await super.canActivate(context);
      
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user

      return user?.role.includes(role)
    }
  }

  return mixin(RoleGuardMixin)
}*/

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles.some(r => r === user.role);

  }
}

/*export const RoleGuard: (...roles: string[]) => CanActivate = createUserRoleGuard

function createUserRoleGuard(...roles:string[]){
  class mixinUserRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext){
      const user = context.switchToHttp().getRequest().user;
      return roles.some(Role => user.role === Role)
    }
  }
}*/
export default RoleGuard;