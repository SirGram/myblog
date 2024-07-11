import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  serveStaticFile(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'dist/public', 'index.html'));
  }
}