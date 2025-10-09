import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RentalCategoryService } from './rental-category.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserRole } from 'src/common/enum/user-role.enum';
import { CreateRentalCategoryDto } from './dto/create-rental-category.dto';
import { UpdateRentalCategoryDto } from './dto/update-rental-category.dto';

@Controller('rental-categories')
export class RentalCategoryController {
  constructor(private readonly categoryService: RentalCategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.STAFF_ADMIN)
  @Post()
  create(@Body() dto: CreateRentalCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  find(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('showAll') showAll?: boolean,
  ) {
    return this.categoryService.find({
      search,
      page: page ? +page : undefined,
      limit: limit ? +limit : undefined,
      showAll,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.STAFF_ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRentalCategoryDto,
  ) {
    return this.categoryService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.STAFF_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
