export interface HeaderProps {
    name: string;
  };

export interface TotalProps {
  totalExercises: number;
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: CoursePart[];
}