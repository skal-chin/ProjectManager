import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from 'server/controllers/api/projects.controller';
import { UsersController } from "server/controllers/users.controller";
import { Project } from 'server/entities/project.entity';
import { User } from "server/entities/user.entity";
import { Role } from "server/entities/role.entity";
import { RefreshToken } from "server/entities/refresh_token.entity";
import { UserRole } from "server/entities/user_role.entity";
import { UserProject } from "server/entities/user_project.entity";
import { ProjectsService } from 'server/providers/services/projects.services';
import { UsersService } from "server/providers/services/users.service";
import { RolesService } from "server/providers/services/roles.service";
import { JwtService } from "server/providers/services/jwt.service";
import { RefreshTokensService } from "server/providers/services/refresh_tokens.service";


@Module({
  imports: [TypeOrmModule.forFeature([Project, User, UserRole, Role, UserProject, RefreshToken])],
  controllers: [ProjectsController, UsersController],
  providers: [ProjectsService, UsersService, RolesService, JwtService, RefreshTokensService],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}