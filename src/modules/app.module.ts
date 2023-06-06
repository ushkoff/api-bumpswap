import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from './config';
import { TokensModule } from './tokens';
import { UsersModule } from './users';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => ({
        uri: `${cfg.mongoDBConfig.uri}/${cfg.mongoDBConfig.database}?readPreference=${cfg.mongoDBConfig.options.readPreference}`
      })
    }),
    TokensModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}