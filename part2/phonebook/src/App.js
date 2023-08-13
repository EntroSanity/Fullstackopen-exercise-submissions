import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import ErrorMessage from './components/ErrorMessage'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      const personToUpdate = persons.find(person => person.name === newName)
      const idToUpdate = personToUpdate.id
      const changedPerson = {...personToUpdate, number:newNumber}

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .updatePerson(idToUpdate, changedPerson)
        .then(returnedPerson => {
          console.log("Returned person:", returnedPerson); // Debugging line
          setPersons(persons.map(person => person.id !== idToUpdate ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setNotifyMessage(`Updated ${changedPerson.name} with new number ${changedPerson.number}`)
          setTimeout(() => {
            setNotifyMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${changedPerson.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== idToUpdate))
        })
      }
    }
    else{
    const nameToAdd = newName;

    personService
    .createPerson(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .then(() => {
      setNotifyMessage(`Added ${nameToAdd}`)
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    })
  }
  }

  const filteredPersons = searchName
    ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : [];

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.error("An error occurred while deleting the person:", error);
          alert(`The person could not be deleted. Error: ${error.message}`);
        });
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage}/>
      <ErrorMessage message={errorMessage}/>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} filteredPersons={filteredPersons} />

      <h3>Add A New</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons persons={persons} deletePerson={deletePerson} />

    </div>
  )
}

export default App