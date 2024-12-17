import { Module } from '@nestjs/common';
import { PredictionModule } from './prediction/prediction.module';
import { PredicionService } from './predicion/predicion.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PredictionModule, CommonModule],
  providers: [PredicionService],
})
export class AppModule {}
