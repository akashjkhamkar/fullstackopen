import React, { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Anecdote = ({ text, votes }) => (
  <>
    {text}
    <div>has {votes} votes</div>
  </>
);

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>;

const MostVotedAnecdote = ({ votes, anecdotes }) => {
  let maxIndex = 0;
  let maxVotes = 0;
  for (const key in votes) {
    if (votes[key] > maxVotes) {
      maxIndex = key;
      maxVotes = votes[key];
    }
  }

  return <Anecdote text={anecdotes[maxIndex]} votes={votes[maxIndex] || 0} />;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const vote = (anectodeIndex) => {
    const copy = { ...votes };
    copy[anectodeIndex] = (copy[anectodeIndex] || 0) + 1;
    setVotes(copy);
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected] || 0} />

      <Button handler={() => vote(selected)} text="vote" />
      <Button
        handler={() => setSelected(getRandomInt(anecdotes.length))}
        text="next anecdote"
      />

      <Header text="Anecdote with most votes" />
      <MostVotedAnecdote votes={votes} anecdotes={anecdotes} />
    </>
  );
};

export default App;
