type TBase = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type TProject = TBase & {
  endPoints?: TEndPoint[];
};

type TEndPoint = TBase & {
  name: string;
  averageResponseTimeInSec: number;
  averageResponseTimeInMs: number;
  project: string;
  requests?: TRequest[];
};

type TRequest = TBase & {
  responseTimeInMs: number;
  responseTimeInSec: number;
  statusCode: number;
  endPoint: string;
  project: string;
};
