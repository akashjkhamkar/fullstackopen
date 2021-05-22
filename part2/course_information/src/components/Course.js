import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ name }) => (
  <div id="Header">
    <h1>{name}</h1>
  </div>
);

const Content = ({ parts }) => {
  const items = parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));
  return items;
};

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + (b.exercises || 0), 0);
  return (
    <div id="Total">
      <p>
        <b> total of {total} exercises</b>
      </p>
    </div>
  );
};

export default Course;
