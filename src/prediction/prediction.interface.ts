interface PredictionData {
  id: string;
  result: string;
  suggestion: string;
  createdAt: string;
}

interface Prediction {
  id: string;
  history: PredictionData;
}

export { PredictionData, Prediction };
