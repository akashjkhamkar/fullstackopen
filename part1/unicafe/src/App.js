import React, { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Button = (props) => <button onClick={props.handler}>{props.text}</button>;

const Statistics = (props) => {
  const sum = props.goodcount + props.neutralcount + props.badcount;

  if (sum === 0) {
    return "No feedback given";
  }

  let average = (props.goodcount - props.badcount) / sum;
  let percentage = (props.goodcount / sum) * 100;

  return (
    <table>
      <tbody>
        <Statistic text="good" count={props.goodcount} />
        <Statistic text="neutral" count={props.neutralcount} />
        <Statistic text="bad" count={props.badcount} />
        <Statistic text="all" count={sum} />
        <Statistic text="average" count={average} />
        <Statistic text="positive" count={percentage + "%"} />
      </tbody>
    </table>
  );
};

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.count}</td>
  </tr>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const AddGoodFeedback = () => setGood(good + 1);
  const AddNeutralFeedback = () => setNeutral(neutral + 1);
  const AddBadFeedback = () => setBad(bad + 1);

  return (
    <div>
      <Header text="Give feedback" />
      <Button handler={AddGoodFeedback} text={"good"} />
      <Button handler={AddNeutralFeedback} text={"neutral"} />
      <Button handler={AddBadFeedback} text={"bad"} />
      <Header text="Statistics" />
      <Statistics goodcount={good} neutralcount={neutral} badcount={bad} />
    </div>
  );
};

export default App;
