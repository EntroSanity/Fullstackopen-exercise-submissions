const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Course = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
            <p><strong>total of {course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</strong></p>
        </div>
    )
}

export default Course