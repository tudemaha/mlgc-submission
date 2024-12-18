import { Global, Module } from '@nestjs/common';
import { TensorflowService } from './tensorflow.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';

@Global()
@Module({
  providers: [
    TensorflowService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [TensorflowService],
})
export class CommonModule {}
