import React from "react";
import { GithubAuthProvider } from "firebase/auth";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { ref, uploadBytes } from "firebase/storage";

export default function App() {
  const [movieList, setMovieList] = React.useState([]);
  const movieCollectionRef = collection(db, "movies");
  const [movieTitle, setMovieTitle] = React.useState("");
  const [movieReleaseDate, setmovieReleaseDate] = React.useState("");
  const [register, setRegister] = React.useState(false);

  const [newTitle, setNewTitle] = React.useState(movieTitle);

  // File upload state
  const [fileUpload, setFileUpload] = React.useState(null);

  const addMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: movieTitle,
        releaseDate: movieReleaseDate,
        isRegistered: register,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    alert(id);
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: newTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const getMovieList = async () => {
    try {
      //read the data
      //set the movie list
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        key: doc.id,
      }));
      // console.log({ filteredData });
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    getMovieList();
  }, []);

  const movieElements = movieList.map((movie) => {
    return (
      <div
        className="movie-container"
        style={{ display: "flex", flexFlow: "column nowrap" }}
      >
        <h1 style={{ color: movie.isRegistered ? "green" : "red" }}>
          {movie.title}
        </h1>
        <h3>Date: {movie.releaseDate}</h3>
        <button onClick={() => deleteMovie(movie.id)}>Delete</button>
        <input
          type="text"
          placeholder="New Title"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={() => updateMovie(movie.id)}>Update</button>
      </div>
    );
  });

  const uploadFile = async () => {
    if (!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container">
      <h1>Test</h1>
      <Auth />
      <div className="movie-data">
        <input
          type="text"
          placeholder="Movie Title"
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setmovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          id="isRegistered"
          checked={register}
          onChange={(e) => setRegister(e.target.checked)}
        />
        <label htmlFor="isRegistered">Register</label>
        <button onClick={addMovie}>Submit Movie</button>
      </div>

      {movieElements}
      <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
      <button onClick={uploadFile}>Upload file</button>
    </div>
  );
}
