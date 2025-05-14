import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const positive = (good / total) * 100;

  const handleGoodClick = () => {
    setGood(good + 1);
    const updatedGood = good + 1;
    setTotal(updatedGood + neutral + bad);
    setAverage((updatedGood + bad * -1) / (updatedGood + bad));
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    const updatedNeutral = neutral + 1;
    setTotal(updatedNeutral + good + bad);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    const updatedBad = bad + 1;
    setTotal(updatedBad + neutral + good);
    setAverage((good + updatedBad * -1) / (good + updatedBad));
  };

  return (
    <div>
      <h1>Give your feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive.toFixed(0)} %</p>
    </div>
  );
};

export default App;
