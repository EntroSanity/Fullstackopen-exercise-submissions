const Individual = ({name, number, deletePerson}) => {
    return (
        <li>
            {name} {number}
            <button onClick={deletePerson}>delete</button>
        </li>
    )
}

export default Individual