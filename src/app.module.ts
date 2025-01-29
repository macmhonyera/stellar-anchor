import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AnchorModule } from './anchor/anchor.module';
import { Sep6Module } from './sep6/sep6.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        };
      },
    }),
    AnchorModule,
    Sep6Module,
  ],
})
export class AppModule {}
