import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}:</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = (props) => {
  return (
    <p>
      <button onClick={props.onClick}>{props.text}</button>
    </p>
  );
};

const Statistics = (props) => {
  if (props.total === 0) {
    return <p> No feedback given </p>;
  } else
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.good} />
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="All" value={props.total} />
            <StatisticLine text="Average" value={props.average} />
            <StatisticLine
              text="Positive"
              value={`${props.positiveFeedback.toFixed(0)} %`}
            />
          </tbody>
        </table>
      </div>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const positiveFeedback = total > 0 ? (good / total) * 100 : 0;

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
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positiveFeedback={positiveFeedback}
      />
    </div>
  );
};

export default App;
