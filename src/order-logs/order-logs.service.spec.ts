import { Test, TestingModule } from '@nestjs/testing';
import { OrderLogsService } from './order-logs.service';

describe('OrderLogsService', () => {
  let service: OrderLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderLogsService],
    }).compile();

    service = module.get<OrderLogsService>(OrderLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
