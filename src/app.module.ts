import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [AnswersModule, QuestionsModule, QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
