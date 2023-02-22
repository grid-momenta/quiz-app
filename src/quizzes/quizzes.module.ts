import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [QuizzesController],
  providers: [QuizzesService, PrismaService],
})
export class QuizzesModule {}
