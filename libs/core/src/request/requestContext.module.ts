import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestCIDMiddleware } from './requestCID.middleware';
import { RequestContextService } from './requestContext.service';
import { ConfigModule } from '@nestjs/config';
import requestContextConfig from './config/requestContext.config';

@Global()
@Module({
  imports: [ConfigModule.forFeature(requestContextConfig)],
  providers: [RequestCIDMiddleware, RequestContextService],
  exports: [RequestContextService, RequestCIDMiddleware],
})
export class RequestContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestCIDMiddleware).forRoutes('*');
  }
}
