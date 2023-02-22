import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaService } from 'src/prisma.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';

@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuizzesService, PrismaService],
})
export class QuestionsModule {}
