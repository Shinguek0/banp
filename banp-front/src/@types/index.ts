export type Step = {
  icon: string;
  id: string;
  isCompleted?: boolean;
};

export type Game = {
  id: number;
  name: string;
};

export type Quiz = {
  id: number;
  title: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  title: string;
};

export type Recommendation = {
  birthDate: string;
  gender: string;
  image: string;
  id: number;
  name: string;
  games: Game[];
  profile: any;
};

export type IMatch = {
  discord: string;
  id: number;
  name: string;
  email: string;
  image: string;
};
