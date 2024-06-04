import { Inject, Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ConfigOptions from '@app/core/config/config.options';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestContextModule } from '@app/core/request/requestContext.module';
import { LoggerModule } from '@app/core/logger/logger.module';
import { APP_LOGGER } from '@app/core/logger/factories/app.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...ConfigOptions,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    RequestContextModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    @Inject(APP_LOGGER) private readonly logger,
  ) {}

  onApplicationBootstrap() {
    this.logger.info(
      `APP: [${this.configService.get('APP_NAME')}] Running in ${this.configService.get('NODE_ENV')} mode on PORT ${this.configService.get('PORT')}`,
    );
  }
}
