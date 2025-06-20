const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part partContent={props.parts[0]} />
      <Part partContent={props.parts[1]} />
      <Part partContent={props.parts[2]} />
    </div>
  );
};

const Part = (props) => {
  console.log("INSIDE PART COMPONENT", props);
  return (
    <div>
      {props.partContent.name} {props.partContent.exercises}
    </div>
  );
};

const Total = (props) => {
  console.log(props);
  return (
    <div>
      Number of exercises:{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
