import { Test, TestingModule } from '@nestjs/testing';
import { EmailclienteService } from './emailcliente.service';

describe('EmailclienteService', () => {
  let service: EmailclienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailclienteService],
    }).compile();

    service = module.get<EmailclienteService>(EmailclienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
