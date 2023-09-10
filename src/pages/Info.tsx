import React, { useEffect, useState } from 'react';


export default function InfoPage() {

  //Satt til NOR, bør settes til cca3 til landet man har klikket på
  const countryCode="NOR"
  const [isFavourite, setIsFavourite] = useState(false);
  const [message, setMessage] = useState("");


  const storedFavourites = JSON.parse(localStorage.getItem('favourites') ||'[]')

  useEffect(() => {
    setIsFavourite(storedFavourites.includes(countryCode));

    if (storedFavourites.includes(countryCode)) {
      setMessage("Fjern fra favoritter");

    }
    else{
      setMessage("Legg til favoritt");
    } 

  }, [countryCode]);
  
  
  
  function handleOnClick(){

      if (!isFavourite) {
        storedFavourites.push(countryCode);
        localStorage.setItem('favourites', JSON.stringify(storedFavourites));
        setIsFavourite(true);
        setMessage("Fjern fra favoritter");
      }
      else{
        const newList: string[] = storedFavourites.filter((code: string) => code !== countryCode);
        localStorage.setItem('favourites', JSON.stringify(newList));
        setIsFavourite(false);
        setMessage("Legg til favoritt");

      }
  }
  return(
    <>
        <h1>This is the about page.</h1>
        {
          <button onClick={handleOnClick}>
            {message}
          </button>
        }
    </>
  ) 
}

