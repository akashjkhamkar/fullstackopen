import React from 'react'

const Header = (props) => (
  <div id="Header">
    <h1>{props.course}</h1>
  </div>
);

const Content = (props) => {
  // using loop to avoid duplicate code
  // saving jsx in items array and returning it as whole
  const items = []
  props.parts.forEach((element, index )=> {
   items.push(
    <Part part = {element} exercises = {props.exercises[index]}/>
    ) 
  });  

  return (
    <div id="content">
      {items}
    </div>
  );
}

const Total = (props) => (
  <div id="Total">
    <p>Number of exercises {props.total}</p>
  </div>
);

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  const parts = [part1,part2,part3];
  const exercises = [exercises1,exercises2,exercises3];

  // Total uses reduce function to calculate the sum
  return (
    <div>
      <Header course = {course}/>
      <Content parts = {parts} exercises = {exercises}/>
      <Total total = {exercises.reduce((a,b) => a + b, 0)}/>
    </div>
  )
}

export default App;