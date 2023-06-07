import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
  exports: [OrdersRepository]
})
export class OrdersModule {}
