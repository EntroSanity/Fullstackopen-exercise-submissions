import React from 'react';

const Country = ({countryObject, index, setSelectedCountry}) => {
    const onclick = () => {
        console.log(countryObject)
        return setSelectedCountry(countryObject)
    }
    return(
        <li key={index}>
            {countryObject.name.common}
            <button onClick={onclick}>show</button>
        </li>
    )
}


export default Country;