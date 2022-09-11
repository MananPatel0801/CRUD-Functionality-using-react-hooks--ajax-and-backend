/* "StAuth10244: 
I Manan Patel, 000812466 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not 
 made my work available to anyone else."
 */


// Starter code for the front-end, includes examples of accessing all server 
// API routes with AJAX requests.

import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import WebFont from 'webfontloader';




const CssTextField = styled(TextField)({
  fontFamily: ['Rokkitt','BioRhyme','Chilanka'].join(','),
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid',
      borderColor: '#112031',
      
    },
    '&:hover fieldset': {
      borderColor: 'lightgreen',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const CssButton = styled(Button) ({
    backgroundColor: '#E1D89F',
    color: '#112031',
    fontFamily: ['Rokkitt','BioRhyme','Chilanka'].join(','),
    '&:hover' : {
      backgroundColor: '#345B63',
    },
    '&:focus' : {
       backgroundColor: 'green',
    },
});

// Material UI is included in the install of the front end, so we have access
// to components like Buttons, etc, when we import them.

function Pets() {
  
  // isLoaded keeps track of whether the initial load of pet data from the
  // server has occurred.  pets is the array of pets data in the table, and 
  // searchResults is the array of pets data after a search request.
  const [isLoaded, setIsLoaded] = useState(false);
  const [pets, setPets] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [animalName, setAnimalName] = useState();
  const [animalDescription, setAnimalDescription] = useState();
  const [animalAge, setAnimalAge] = useState();
  const [animalPrice, setAnimalPrice] = useState();
  const [searchTerm, setSearchTerm] = useState();

  // fetches all pet data from the server
  function fetchPets()
  {
    fetch("http://localhost:3001/api?act=getall")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setPets(result);
      })    
  }
  
  // use fetchPets as an effect with an empty array as a 2nd argument, which 
  // means fetchPets will ONLY be called when the component first mounts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Rokkitt','BioRhyme','Chilanka']
      }
    });
   },[]);
   useEffect(fetchPets, []);

  function handleNameChange(event){
      setAnimalName(event.target.value);
      
  }
  
  function handleDescriptionChange(event){
    setAnimalDescription(event.target.value);
  }

  function handleAgeChange(event){
    setAnimalAge(event.target.value);
  }

  function handlePriceChange(event){
    setAnimalPrice(event.target.value);
  }

  /* function handleSearch(event) {
    setSearchTerm(event.target.value);
  } */

  // Inserts a pet with hardcoded data in the URL for each query parameter, we 
  // could insert a pet with custom data by building a string like this:
  //
  // let url = "http://localhost:3001/api?act=add&animal=" + animal + ...
  //
  // fetch(url)
  // .then( ... )...
  //
  function addPet(Name, Description, Age, Price)
  {
    Name = animalName;
    Description = animalDescription;
    Age = animalAge;
    Price = animalPrice;

    let url = "http://localhost:3001/api?act=add&animal=" + animalName +"&description=" + animalDescription+"&age=" + animalAge + "&price=" + animalPrice; 
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })    
    //Setting the form elements back to empty
    setAnimalName("");
    setAnimalDescription("");
    setAnimalAge("");
    setAnimalPrice("");
  }

 
  // Deletes a pet from the pet inventory, using a hardcoded id query parameter
  // Again we could delete a pet with custom data by building a string like:
  //
  // let url = "http://localhost:3001/api?act=delete&id=" + id
  //
  // fetch(url)
  // .then( ... )...
  //
  // 
  function deletePet(id)
  {
    let url = "http://localhost:3001/api?act=delete&id=" + id;
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      })    
  }

  // Updates a pet in the pet inventory.  Again we use hardcoded data but 
  // could build a custom fetch URL string.
  function updatePet()
  {
    fetch("http://localhost:3001/api?act=update&id=1&animal=Parrot&description=Green&age=6&price=550.95")
    .then(res => res.json())
    .then(
      (result) => {
        fetchPets();
      });
  }  
  

  
  // Searches for pets in the pet inventory.  Again we use hardcoded data but
  // we could build a custom fetch URL string.
  function searchPet(event)
  {
    setSearchTerm(event.target.value);
    if(event.target.value == ""){
      fetch("http://localhost:3001/api?act=getall")
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          setSearchResults(result);
        })    
    }
    else{
    let url = "http://localhost:3001/api?act=search&term=" + searchTerm;
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        setSearchResults(result);
      });
    }
    
  }

  // If data has loaded, render the table of pets, buttons that execute the 
  // above functions when they are clicked, and a table for search results. 
  // Notice how we can use Material UI components like Button if we import 
  // them as above.
  //
  if (!isLoaded) {
    return <div className="font-loader">Loading...</div>;
  } else {
    return (
      <div className="font-loader">
        <h1>Server API Usage Demonstration</h1>
        <h2>Pets</h2>
       
        <br />

        <table>
          <tbody>
          <tr>
            {/* <th>ID</th> */}
            <th>Animal</th>
            <th>Description</th>
            <th>Age</th>
            <th>Price</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
          {pets.map(pet => (
            <tr key={pet.id}>
              {/* <td>{pet.id}</td>  */}
              <td>{pet.animal}</td> 
              <td>{pet.description}</td>
              <td>{pet.age}</td>
              <td>{pet.price}</td>
              <td> <CssButton variant = "contained" onClick={() => deletePet(pet.id)} startIcon={<DeleteIcon />}> Delete </CssButton></td>
              <td><CssButton variant="contained" onClick={() => updatePet(pet.id)}> Update </CssButton></td>
            </tr>
          ))}
          </tbody>
        </table>
        <br />

        {/* <h2>Functions</h2>
        <Button variant="contained" onClick={addPet}>Add Dalmatian Pet</Button>
        <br /> <br />
        <Button variant="contained" onClick={deletePet}>Delete Pet ID=3</Button>
        <br /> <br />
        <Button variant="contained" onClick={updatePet}>Update Pet ID=1</Button>
        <br /> <br />
        <Button variant="contained" onClick={searchPet}>Search Pets for "friendly with"</Button>
       
 */}  
  <hr />
         <br />
        <h2> Add a new Pet to the list </h2>
        
        <Box componenet = "form" 
          sx={{
                display: 'grid',
                gridTemplateColumns: { sm: '1fr 1fr' },
                gap: 2,
              '& > :not(style)': { m: 1 }, 
            }} 
            noValidate
            autoComplete="off"
        >
          <FormControl>
            {/* <InputLabel>Animal Name </InputLabel> */}
            <CssTextField  required label="Animal Name" value={animalName} onChange={handleNameChange} variant="outlined" type="text"/>
            {/* <OutlinedInput required value={animalName} onChange={handleNameChange} label="Animal Name" /> */}
          </FormControl>

          <FormControl>
          <CssTextField required label="Animal Description" value={animalDescription} onChange={handleDescriptionChange} variant="outlined" type="text"/>
            {/* <InputLabel>Animal Description </InputLabel>
            <OutlinedInput required value={animalDescription} onChange={handleDescriptionChange} label="Animal Description"/> */}
          </FormControl>

          <FormControl>
          <CssTextField required  label="Animal Age" value={animalAge} onChange={handleAgeChange} variant="outlined" type="number"
          InputProps={{
              inputProps: {
                min: 1,
              }
            }}/>
           {/*  <InputLabel>Animal Age </InputLabel>
            <OutlinedInput value={animalAge} onChange={handleAgeChange} label="Animal Age"/> */}
          </FormControl>

          <FormControl>
          <CssTextField required  label="Animal Price" value={animalPrice} onChange={handlePriceChange} variant="outlined" type="number"
           InputProps={{
            inputProps: {
              min: 0,
            }
          }}/>
            {/* <InputLabel>Animal Price </InputLabel>
            <OutlinedInput value={animalPrice} onChange={handlePriceChange} label="Animal Price"/> */}
          </FormControl>
          
        </Box>
        <br />
        <CssButton  variant="contained" onClick={addPet}> Add a Pet </CssButton>

        <br /><br />
        <hr />
        <br /> <br />
        <CssTextField label="Search the table here." value={searchTerm} onChange={searchPet} variant="outlined" type="text" />
        <br />
        <h2>Search Results</h2>
        <table>
          <tbody>
          <tr>
            <th>ID</th>
            <th>Animal</th>
            <th>Description</th>
            <th>Age</th>
            <th>Price</th>
          </tr>
          {searchResults.map(result => (
            <tr key={result.id}>
              <td>{result.id}</td> 
              <td>{result.animal}</td> 
              <td>{result.description}</td>
              <td>{result.age}</td>
              <td>{result.price}</td>
            </tr>
          ))}
          </tbody>
        </table>

      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Pets />
    </div>
  );
}

export default App;
