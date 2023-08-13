import Individual from "./Individual"

const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            <ul>
                {persons.map((person) =>
                    <Individual key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id) } />
                )}
            </ul>
        </div>
    )
}

export default Persons