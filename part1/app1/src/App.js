import React from 'react'

const Header = (props) => (
  <div id="Header">
    <h1>{props.course}</h1>
  </div>
);

const Content = (props) => (
  <div id="content">
    <Part part = {props.part1} exercises = {props.exercises1}/>
    <Part part = {props.part2} exercises = {props.exercises2}/>
    <Part part = {props.part3} exercises = {props.exercises3}/>
  </div>
);

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
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <Content part1 = {part1} part2 = {part2} part3 = {part3} exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3}/>
      <Total total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App;