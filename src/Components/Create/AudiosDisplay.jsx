// AudiosDisplay.js
import React, { useState, useEffect } from 'react';
import { storage, ref, listAll, getDownloadURL, deleteObject } from "../LoginPage/firebaseStorage";
import './AudiosDisplay.css'; // Import CSS file for styling
import { signOut } from "firebase/auth";
import { database } from "../LoginPage/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const AudiosDisplay = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [audioElements, setAudioElements] = useState({});
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);


  const signout = () => {
    signOut(database)
      .then(() => {
        // Successful sign-out
        alert("User signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Error signing out:", error.message);
      });
  };


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(database, (user) => {
  //     if (!user) {
  //       // User is not authenticated
  //       alert("Please sign up to access this page");
  //       navigate("/loginpage");
  //     } else {
  //       setUserId(user.uid);
  //     }
  //   });

  //   const fetchAudioFiles = async () => {
  //     const folderRef = ref(storage);

  //     // List all files in the folder
  //     const audioFiles = await listAll(folderRef);

  //     const urls = await Promise.all(
  //       audioFiles.items.map(async (item) => {
  //         const url = await getDownloadURL(item);
  //         return { url, name: item.name, itemRef: item };
  //       })
  //     );
  //     setAudioFiles(urls);
  //   };

  //   fetchAudioFiles();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(database, (user) => {
      if (!user) {
        // User is not authenticated
        alert("Please sign up to access this page");
        navigate("/loginpage");
      } else {
        setUserId(user.uid);
  
        // Fetch audio files only if user is authenticated
        fetchAudioFiles(user.uid);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
  const fetchAudioFiles = async (userId) => {
    const folderRef = ref(storage);
  
    // List all files in the folder
    const audioFiles = await listAll(folderRef);
  
    const filteredAudioFiles = await Promise.all(
      audioFiles.items.map(async (item) => {
        const url = await getDownloadURL(item);
        var name = item.name;
        console.log(name)
        if (name.includes(userId)) {
          name = name.replace("_"+userId+"_","")
          console.log(item)
          return { url, name, itemRef: item };
        }
        return null;
      })
    );
  
    // Remove null items from the filtered array
    const urls = filteredAudioFiles.filter(Boolean);
  
    setAudioFiles(urls);
  };
  

  const toggleAudio = (url) => {
    const audio = audioElements[url] || new Audio(url); 
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    setAudioElements({ ...audioElements, [url]: audio }); 
  };

  

  const deleteAudio = async (itemRef, index) => {
    try {
      // Delete the file from storage
      await deleteObject(itemRef);

      // Remove the deleted audio from the state
      setAudioFiles(prevFiles => prevFiles.filter((file, i) => i !== index));
    } catch (error) {
      console.error('Error deleting audio:', error);
    }
  };

  return (
    <div className="centered-container">
      <h1>Audio Reader</h1>
      {audioFiles.map((audio, index) => (
        <div key={index}>
          <h2 style={{color:'red'}}>{audio.name}</h2>
          <button className="playButton" onClick={() => toggleAudio(audio.url)}>
            {audioElements[audio.url] && !audioElements[audio.url].paused ? 'Pause' : 'Play'}
          </button>
          <button className="deleteButton" onClick={() => deleteAudio(audio.itemRef, index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AudiosDisplay;
