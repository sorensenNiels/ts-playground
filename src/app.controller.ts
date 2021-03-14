import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @InjectPinoLogger(AppController.name) private readonly logger: PinoLogger,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
