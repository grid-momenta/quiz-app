/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Prisma } from '@prisma/client';
import { errorRes, successRes } from 'src/responses';


@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async create(@Body() input: Prisma.AnswerCreateInput) {
    try {
      const data = await this.answersService.create(input);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Answer did not created');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.answersService.findAll({});
      if (data.length) {
        return successRes(data);
      } else {
        return errorRes('Answer not found');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.answersService.findOne(+id);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Answer not found');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: Prisma.AnswerUpdateInput,
  ) {
    try {
      const data = await this.answersService.update(+id, input);
      if (data) {
        return successRes(data);
      } else {
        return errorRes('Answer did not update');
      }
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.answersService.remove(+id);
    } catch (error) {
      console.log(error);
      return errorRes('Something went wrong');
    }
  }
}
