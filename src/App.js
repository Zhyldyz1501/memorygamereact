import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 
import { nanoid } from 'nanoid';

 const URL = " https://api.unsplash.com/photos/?client_id=";
 const KEY = "Wfk0zlz7NARsWC2evzBSYhuKJqCnkzYpJQmwKY5VyL4";
function App() {
  const [photos, setPhotos] =useState([])
  const fetchingFromServer = async () => {
    try {
      // const req = await fetch(URL + KEY+'&page=2')
      // const data = await req.json()
      // const resp = await axios.get(URL + KEY + "&page=2");
      // const resp2 = await axios.get(URL + KEY + "&page=3");
      const [page1, page2] = await axios.all([
        axios.get(URL + KEY + "&page=2"), axios.get(URL + KEY + "&page=3")])
      let data = [
        ...page1.data,
        ...page1.data,
        ...page2.data.slice(0, 2),
        ...page2.data.slice(0, 2)
      ];

      data = data.map((image) => {
        return ({...image, unique:nanoid()})
      })

      setPhotos(data)
    } catch (err) {
      console.log(err)
      }
    }
    useEffect(() => {
      fetchingFromServer()
    }, [])

    return (
      <div className="App">
        {photos.map((photo) => {
          return (
            <div className='card' key={photo.unique}>
              <img src={photo.urls.thumb} alt={photo.alt_description}/>
            </div>
          )
        })}
      </div> 
    )  
}

export default App;
