import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticsLine text='good' value={props.good} />
      <StatisticsLine text='neutral' value={props.neutral} />
      <StatisticsLine text='bad' value={props.bad} />
      <StatisticsLine text='total' value={props.total} />
      <StatisticsLine text='average' value={(1 * props.good + 0 * props.neutral - 1 * props.bad) / props.total} />
      <StatisticsLine text='positive' value={(100 * props.good) / props.total + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  const header = {
    name1: 'give feedback',
    name2: 'statistics'
  }

  const goodReviews = () => {
    // console.log('good reviews, value before', good)
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const badReviews = () => {
    // console.log('bad reviews, value before', bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }

  const neutralReviews = () => {
    // console.log('neutral reviews, value before', neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }


  return (
    <div>
      <Header header={header.name1} />
      <Button handleClick={goodReviews} text='good' />
      <Button handleClick={neutralReviews} text='neutral' />
      <Button handleClick={badReviews} text='bad' />
      <Header header={header.name2} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App