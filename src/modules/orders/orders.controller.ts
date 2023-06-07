import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Request,
} from '@nestjs/common';

import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(@Request() req): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOder(body);
  }
}
