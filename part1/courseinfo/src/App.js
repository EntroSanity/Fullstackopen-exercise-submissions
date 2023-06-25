const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} has {props.exercises} exercises
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} exercises={props.exercises[0]} />
      <Part part={props.part[1]} exercises={props.exercises[1]} />
      <Part part={props.part[2]} exercises={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        The total number of exercises is {props.exercise1 + props.exercise2 + props.exercise3}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={[course.parts[0].name, course.parts[1].name, course.parts[2].name]} exercises={[course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises]} />
      <Total exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2].exercises} />
    </div>
  )
}

export default App