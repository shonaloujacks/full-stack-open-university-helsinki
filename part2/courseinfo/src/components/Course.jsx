const Course = (props) => {
  console.log(props);
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <div>
      <Header courseName={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={total} />
    </div>
  );
};

const Header = (props) => <h1>{props.courseName}</h1>;

const Content = (props) => {
  // console.log(props);
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => <p>total of {props.total} exercises</p>;

export default Course;
