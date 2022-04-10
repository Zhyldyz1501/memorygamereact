import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 
import { nanoid } from 'nanoid';

 const URL = " https://api.unsplash.com/photos/?client_id=";
 const KEY = "Wfk0zlz7NARsWC2evzBSYhuKJqCnkzYpJQmwKY5VyL4";
function App() {
  const [photos, setPhotos] = useState([])
  const [selected, setSelected] = useState(null)
  const [reset, setReset] = useState(false)
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
       const shuffle = (array) => {
         for (let i = 0; i < array.length; i++) {
           const randomIndex = Math.floor(Math.random() * array.length);
           // [arr[randomIndex], arr[i]] = [arr[i],arr[randomIndex]]
           const temp = array[randomIndex];
           array[randomIndex] = array[i];
           array[i] = temp;
         }
         return array;
       };
       data = shuffle(data);
      setPhotos(data)
    } catch (err) {
      console.log(err)
      }
  }
    const handleClick = (index) => {
      let newPhotos = [...photos];
      newPhotos[index].showThisPhoto = true;
      setPhotos(newPhotos);
      if (selected === null) {
        setSelected(index)
        return
      } else {
        if (newPhotos[index].unique === newPhotos[selected].unique) {
          console.log('the same photo was clicked')
          return
        } else {
          //the photos have different id
          //if the id is different we have to change showThisPhoto to false
          if (newPhotos[index].id !== newPhotos[selected].id){
            console.log('they are different')
          setTimeout(() => {
            newPhotos[index].showThisPhoto = false
            newPhotos[selected].showThisPhoto = false
            setSelected(null)
            setPhotos(newPhotos);
          }, 500)
        }else {
          setSelected(null)
          console.log('...')
          }
        }
      }
    };
    
    useEffect(() => {
      fetchingFromServer()
    }, [reset])

    return (
      <div className="App">
        {photos.map((photo, index) => {
          return (
            <div className='card' key={photo.unique} onClick={()=> handleClick(index)}>
              <img src={photo.urls.thumb} alt={photo.alt_description} className={photo.showThisPhoto ? 'show' : 'notShow'}/>
            </div>
          )
        })}
        <buttton onClick={()=>setReset(!reset)}>Reset</buttton>
      </div> 
    )  
}

export default App;
