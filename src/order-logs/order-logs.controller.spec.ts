import { Test, TestingModule } from '@nestjs/testing';
import { OrderLogsController } from './order-logs.controller';
import { OrderLogsService } from './order-logs.service';

describe('OrderLogsController', () => {
  let controller: OrderLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderLogsController],
      providers: [OrderLogsService],
    }).compile();

    controller = module.get<OrderLogsController>(OrderLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
