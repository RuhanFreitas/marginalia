import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { MarginaliaModule } from './marginalia/marginalia.module'
import { CommentModule } from './comment/comment.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        UserModule,
        MarginaliaModule,
        CommentModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
