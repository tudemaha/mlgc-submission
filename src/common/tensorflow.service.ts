import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as tfjs from '@tensorflow/tfjs-node';

@Injectable()
export class TensorflowService implements OnApplicationBootstrap {
  private model: tfjs.GraphModel;

  async onApplicationBootstrap() {
    this.model = await this.loadModel();
    console.log('Model loaded');
  }

  async loadModel(): Promise<tfjs.GraphModel> {
    const modelUrl = process.env.MODEL_URL;
    const model = await tfjs.loadGraphModel(modelUrl);
    return model;
  }

  async predict(buffer: Buffer): Promise<string> {
    try {
      const tensor = tfjs.node
        .decodeImage(buffer)
        .resizeNearestNeighbor([224, 224])
        .expandDims(0)
        .toFloat();

      const prediction = this.model.predict(tensor) as tfjs.Tensor;
      const output = prediction.dataSync();
      const probability = Math.max(...output);

      tensor.dispose();
      prediction.dispose();

      return probability > 0.5 ? 'Cancer' : 'Non-cancer';
    } catch {
      throw new BadRequestException();
    }
  }
}
