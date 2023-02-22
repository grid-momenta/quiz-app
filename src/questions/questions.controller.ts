/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Prisma } from '@prisma/client';
import { errorRes, successRes } from 'src/responses';
import { QuizzesService } from 'src/quizzes/quizzes.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly quizzesService: QuizzesService,
  ) {}

  @Post()
  async create(
    @Body() input: Prisma.QuestionCreateInput,
  ) {
    try {
      const data = await this.questionsService.create(input);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Question did not created');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.questionsService.findAll({});
      if (data.length) {
        return successRes(data);
      } else {
        return errorRes('Question not found');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.questionsService.findOne(+id);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Question not found');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: Prisma.QuestionUpdateInput,
  ) {
    try {
      const data = await this.questionsService.update(+id, input);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Question did not update');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.questionsService.remove(+id);
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }
}
