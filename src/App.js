import React, { useEffect, useState } from 'react';
import { BehaviorSubject, Observable } from "rxjs";
import { getCharacters } from "./services/character-service";
import { Card, CardHeader, CardBody, CardFooter, ImageHeader } from 'react-simple-card';

import './App.css';

const subject$ = new BehaviorSubject("");

function App() {

  const [value, setValue] = useState();
  const [characters, setCharacters] = useState();

  useEffect(() => {
    const subscription = getCharacters(subject$).subscribe(
      suggestions => {
        setCharacters(suggestions || []);
      },
      error => {
        let message = error.response ? error.response.error : "try again";
        alert(message);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = event => {
    let value = event.target.value;
    setValue(value);
    subject$.next(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-sarch">
          <h2 className="App-tile"> Search your favorites characters of Rick and Morty </h2>
          <input
            className="App-input"
            onChange={(event) => handleChange(event)}
            placeholder="start typing"
          />
        </div>
        <div className="App-items">
          {Array.isArray(characters) && characters.map(({ id, name, status, species, image }) => (
            <Card key={id} style={{ width: 120 }}>
              <CardHeader>
                {species}
              </CardHeader>
              <ImageHeader imageSrc={image} />
              <CardBody>
                {name}
              </CardBody>
              <CardFooter>{status}</CardFooter>
            </Card>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
