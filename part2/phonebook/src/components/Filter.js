import Individual from "./Individual";

const Filter = ({ searchName, handleSearchChange, filteredPersons = [] }) => {
    return (
        <div>
            <form onSubmit={(event) => event.preventDefault()}>
                <div>
                    filter shown with: <input value={searchName} onChange={handleSearchChange} />
                </div>
            </form>
            <ul>
                {filteredPersons.map((person) =>
                    <Individual key={person.id} name={person.name} number={person.number} />
                )}
            </ul>
        </div>
    )
}

export default Filter;
