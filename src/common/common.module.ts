import { Global, Module } from '@nestjs/common';
import { TensorflowService } from './tensorflow.service';

@Global()
@Module({
  providers: [TensorflowService],
  exports: [TensorflowService],
})
export class CommonModule {}
