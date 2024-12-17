import { Module } from '@nestjs/common';
import { PredictionModule } from './prediction/prediction.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PredictionModule, CommonModule],
})
export class AppModule {}
