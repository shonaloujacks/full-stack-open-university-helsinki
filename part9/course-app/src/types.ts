export interface HeaderProps {
    name: string;
  };

export interface TotalProps {
  totalExercises: number;
}

export interface PartProps {
  courseParts: CoursePart[]
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}



