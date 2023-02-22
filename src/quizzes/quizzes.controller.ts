/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Prisma } from '@prisma/client';
import { errorRes, successRes } from 'src/responses';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  async create(@Body() input: Prisma.QuizCreateInput) {
    try {
      const data = await this.quizzesService.create(input);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Quiz did not created');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.quizzesService.findAll({});
      if (data.length) {
        return successRes(data);
      } else {
        return errorRes('Quiz not found');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.quizzesService.findOne(+id);
      if (data) {
        return successRes(data);
      } else {
        return errorRes("Quiz not found");
      }
    } catch (error) {
      console.log(error)
      return errorRes('Something went wrong');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: Prisma.QuizUpdateInput,
  ) {
    try {
      const data = await this.quizzesService.update(+id, input);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Quiz did not update');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.quizzesService.remove(+id);
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }
}
