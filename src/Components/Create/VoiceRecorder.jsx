// VoiceRecorder.js
import React, { useState, useEffect } from 'react';
import { storage, ref, uploadBytes } from "../LoginPage/firebaseStorage";
import './VoiceRecorder.css'; // Import CSS file for styling
import { signOut } from "firebase/auth";
import { database } from "../LoginPage/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrls, setAudioUrls] = useState([]);
  const [audioStream, setAudioStream] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

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

  const handleStartRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setAudioStream(stream);
        const chunks = [];
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = event => {
          chunks.push(event.data);
        };
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrls(prevUrls => [...prevUrls, url]);
          setRecordedChunks(chunks);
        };
        recorder.start();
        setMediaRecorder(recorder);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      setIsRecording(false);
      mediaRecorder.stop();
      audioStream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSaveRecording = () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    if (recordedChunks.length === 0) {
      console.error('No recorded audio data');
      return;
    }

    recordedChunks.forEach((chunk, index) => {
      const audioRef = ref(storage, `audio_${userId}_${Date.now()}.mp3`);
      uploadBytes(audioRef, chunk).then((snapshot) => {
        alert(`audio_${userId}_${Date.now()}.mp3 uploaded successfully`);
      }).catch((error) => {
        console.error(`Error uploading audio_${userId}_${Date.now()}.mp3`, error);
      });
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(database, (user) => {
      if (!user) {
        // User is not authenticated
        alert("Please sign up to access this page");
        navigate("/loginpage");
      } else {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="centered-container">
      <h1>Voice Recorder</h1>
      <div className="button-container">
        {isRecording ? (
          <button onClick={handleStopRecording}>Stop Recording</button>
        ) : (
          <button onClick={handleStartRecording}>Start Recording</button>
        )}
        <button onClick={handleSaveRecording} disabled={audioUrls.length === 0}>
          Save Recordings
        </button>
      </div>
      {audioUrls.map((url, index) => (
        <div key={index}>
          <audio controls src={url}></audio>
        </div>
      ))}
    </div>
  );
};

export default VoiceRecorder;
