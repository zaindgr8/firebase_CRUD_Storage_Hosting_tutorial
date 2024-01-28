import React, { useEffect, useState } from 'react'
import Auth from './components/auth'
import {db, auth, storage} from "./config/firebase"
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
import {ref, uploadBytes} from "firebase/storage"

const App = () => {
  const [movieList, setMovieList]=useState([])
  //New Movie States
  const [newMovieTitle, setNewMovieTitle]=useState("")
  const [newReleaseDate, setNewReleaseDate]= useState(0)
  const [newAward, setAward]= useState(false)

  //updat Title State
  const [updatedTitle, setUpdatedTitle]= useState("")
  const moviesCollectionRef=collection(db, "movies")

  //File Upload State
  const [fileUpload, setFileUpload]=useState(null)

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData)
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    getMovieList()
  }, [])

  const onSubmitMovie=async()=>{
    try{
    await addDoc(moviesCollectionRef, {
      title:newMovieTitle,
      releaseDate:newReleaseDate,
      award:newAward,
      userId: auth?.currentUser?.uid
    })
    getMovieList()
  }catch(err){
    console.log(err)
  }
  }

  const onDeleteMovie= async(id)=>{
    const movieDoc= doc(db, "movies", id)
    try{
    await deleteDoc(movieDoc)
    getMovieList();
    }catch(err){
      console.log(err)
    }
  }

   const onUpdateMovie = async (id) => {
     const movieDoc = doc(db, "movies", id)
     try{
     await updateDoc(movieDoc, {title:updatedTitle})
     getMovieList()
     }catch(err){
      console.log(err)
     }
   }

   const onUploadFile=async ()=>{
      if(!fileUpload) return;
      const fileFolderRef= ref(storage, `projectFiles/${fileUpload.name}`)
      try{
      await uploadBytes(fileFolderRef, fileUpload)
      }catch(err){
        console.error(err)
      }
   }



  return (
    <>
      <Auth />
      <div>
        <input
          onChange={(e) => setNewMovieTitle(e.target.value)}
          className="border-2"
          placeholder="Movie Title..."
        />
        <input
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          className="border-2"
          placeholder="Release Date..."
          type="number"
        />
        <input
          checked={newAward}
          onChange={(e) => setAward(e.target.checked)}
          type="checkbox"
        />
        <label>Received an Oscar</label>
        <button className="border-2 rounded-xl ml-2" onClick={onSubmitMovie}>
          Submit Movie
        </button>
      </div>
      {movieList.map((movie) => (
        <div className="p-5">
          <h1
            style={{ color: movie.award ? "green" : "red" }}
            className="text-2xl font-bold"
          >
            {movie.title}
          </h1>
          <p>Date: {movie.releaseDate}</p>
          <button
            onClick={() => onDeleteMovie(movie.id)}
            className="mt-2 border-2 rounded-xl p-1"
          >
            Delete
          </button>
          <input
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border-2 px-1 ml-2 mr-2"
            placeholder="new title..."
          />
          <button
            onClick={() => onUpdateMovie(movie.id)}
            className="mt-2 mr-2 border-2 rounded-xl p-1"
          >
            Update
          </button>
          <input
            onChange={(e) => setFileUpload(e.target.files[0])}
            type="file"
          />
          <button
            className="border-2 rounded-xl p-1"
            onClick={onUploadFile}
          >
            Upload File
          </button>
        </div>
      ))}
    </>
  );
}

export default App