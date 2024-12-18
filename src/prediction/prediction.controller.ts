import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TensorflowService } from 'src/common/tensorflow.service';
import { v4 as uuidv4 } from 'uuid';
import PredictionData from './prediction.interface';
import { PredictionService } from './prediction.service';

@Controller('predict')
export class PredictionController {
  constructor(
    private readonly tensorflowService: TensorflowService,
    private readonly predictionService: PredictionService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 1000000 },
    }),
  )
  async predict(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PredictionData> {
    if (!file) {
      throw new BadRequestException();
    }

    const result = await this.tensorflowService.predict(file.buffer);
    const suggestion =
      result == 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';

    const id = uuidv4();
    const saveData: PredictionData = {
      id,
      result,
      suggestion,
      createdAt: new Date(),
    };

    await this.predictionService.create(saveData);

    return saveData;
  }
}
