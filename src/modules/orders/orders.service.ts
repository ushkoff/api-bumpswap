import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './schemas';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.getAll();
  }

  async createOder(data: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.create(data);
  }

  async getByExchangeId(id: string): Promise<Order> {
    return this.ordersRepository.findByExchangeId(id);
  }

  async deleteOrder(id: string): Promise<string> {
    return this.ordersRepository.delete(id);
  }
}
