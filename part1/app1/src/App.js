import React from "react";

const Header = (props) => (
  <div id="Header">
    <h1>{props.course}</h1>
  </div>
);

const Content = (props) => {
  const items = [];
  props.parts.forEach((part) => {
    items.push(<Part part={part.name} exercises={part.exercises} />);
  });

  return <div id="content">{items}</div>;
};

const Total = (props) => {
  const total = props.parts.reduce((a, b) => a + (b.exercises || 0), 0);
  return (
    <div id="Total">
      <p>Number of exercises {total}</p>
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
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
