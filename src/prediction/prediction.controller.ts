import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TensorflowService } from 'src/common/tensorflow.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('predict')
export class PredictionController {
  constructor(private readonly tensorflowService: TensorflowService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async predict(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.tensorflowService.predict(file.buffer);
    const suggestion =
      result == 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';

    const id = uuidv4();
    const saveData = {
      id,
      result,
      suggestion,
      createdAt: new Date(),
    };
  }
}
