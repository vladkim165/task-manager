export interface ITask {
  id: string;
  status: number;
  priority: number;
  title: string;
  description: string;
  schedule: {
    creation_time: string;
  };
  author_name: string;
}

export interface IColors {
  [key: string]: string;
}

export enum Priorities {
  high = 0,
  medium = 1,
  low = 2,
}
