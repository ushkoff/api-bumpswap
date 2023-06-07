import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async getAll(): Promise<Order[]> {
    try {
      return await this.orderModel.find().lean().exec();
    } catch (error) {
      throw new Error('Failed to fetch orders.');
    }
  }

  async create(order: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = new this.orderModel(order);
      const savedOrder = await newOrder.save();
      return savedOrder.toObject();
    } catch (error) {
      throw new Error('Failed to create order.');
    }
  }

  async findByExchangeId(id: string): Promise<Order> {
    try {
      const order = await this.orderModel.findOne({ exchangeId: id }).lean().exec();

      if (!order) {
        throw new Error('Order not found');
      }

      return order;
    } catch (error) {
      throw new Error('Failed to retrieve order by exchangeId.');
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const order = await this.orderModel.deleteOne({ _id: id });

      if (order.deletedCount === 0) {
        throw new Error('Order not found');
      }

      return 'Order deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete order.');
    }
  }
}
