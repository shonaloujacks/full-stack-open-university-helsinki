import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0);

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8));
  };

  const handleVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setMostVotedAnecdote(findMaxIndex(copyVotes));
    setVotes(copyVotes);
  };

  const findMaxIndex = (votes) => {
    const maxValue = Math.max(...votes);
    return votes.indexOf(maxValue);
  };

  return (
    <div>
      <h1> Anecdote of the day</h1>
      <i>{anecdotes[selected]}</i>
      <p>
        has <b>{votes[selected]}</b> votes today
      </p>
      <p>
        <button onClick={handleNextAnecdote}>Next anecdote</button>
      </p>
      <button onClick={handleVote}>Vote</button>
      <h1>Anecdote with the most votes</h1>
      <i>{anecdotes[mostVotedAnecdote]}</i>
    </div>
  );
};

export default App;
