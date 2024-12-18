import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { PredictionData, Prediction } from './prediction.interface';

@Injectable()
export class PredictionService {
  private firestore = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  async create(data: PredictionData) {
    const document = this.firestore.collection('predictions').doc(`${data.id}`);
    await document.set(data);
  }

  async getAll(): Promise<Prediction[]> {
    const snapshot = await this.firestore.collection('predictions').get();
    const predictions: Prediction[] = [];
    snapshot.forEach((doc) => {
      const prediction = doc.data() as PredictionData;
      const data: Prediction = {
        id: prediction.id,
        history: prediction,
      };
      predictions.push(data);
    });

    return predictions;
  }
}
