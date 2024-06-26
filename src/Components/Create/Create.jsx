import React from "react";
import { useEffect,useState } from "react";
import { storage, ref, uploadBytes } from "../LoginPage/firebaseStorage";
import { onAuthStateChanged } from "firebase/auth";
import "./Create.css";
import VoiceRecorder from "./VoiceRecorder";
import AudiosDisplay from "./AudiosDisplay";
import BottomSection from "../BottomSection/BottomSection";
import { signOut } from "firebase/auth";
import { database } from "../LoginPage/firebase";
import { useNavigate } from "react-router-dom";
import AvatarUpload from './avatarupload';



function Create() {
    const [userId, setUserId] = useState(null);
    const handleSaveRecording = (event) => {
        if (!userId) {
          alert("Please sign up to access this page");
          return;
        }
      
        console.log("Entered handleSaveRecording");
      
        const file = event.target.files[0];
        if (!file) {
          console.error('No file selected');
          return;
        }
      
        const timestamp = Date.now();
        const newFileName = `audio_${userId}_${timestamp}.mp3`;
        const renamedFile = new File([file], newFileName, { type: file.type });
      
        console.log("Handled file in handleSaveRecording");
      
        const audioRef = ref(storage, `${newFileName}`);
      
        uploadBytes(audioRef, renamedFile)
          .then((snapshot) => {
            alert(`audio_${timestamp}.mp3 uploaded successfully`);
          })
          .catch((error) => {
            console.error(`Error uploading ${newFileName}`, error);
          });
      };
    


    const handleFileUpload = (event) => {
        console.log("Entered Create's handleFileUpload")
        const file = event.target.files[0];
        if (file) {
          // Handle the uploaded file, e.g., send it to the server or process it
          console.log('Uploaded file:', file);
        }
      };
      
      const UploadComponent = () => {
        return (
          <div>
            <h2>Upload MP3 File</h2>
            <input type="file" accept="audio/mp3" onChange={handleSaveRecording} />
          </div>
        );
      };

    const history = useNavigate();
   const signout = () => {
       signOut(database)
           .then(() => {
               // Successful sign-out
               alert("User signed out successfully");
               history("/");
           })
           .catch((error) => {
               // Handle sign-out errors
               console.error("Error signing out:", error.message);
           });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(database, (user) => {
            if (!user) {
                // User is not authenticated
                // alert("Please sign up to access this page");
                // // Redirect to the login page or another appropriate page
                // history("/loginpage");
            }else {
                setUserId(user.uid);
              }
        });

        return () => unsubscribe();
    }, [history]);


   

    return (
        <div className="booksMain">
                       <div className="booksbtm">
                    <div className="row">
                      <div className="col-6" style={{justifyContent: "center", display: "flex"}}><h1>Voices</h1></div>
                      <div className="col-6" style={{justifyContent: "center", display: "flex"}}><h1>Avatar</h1></div>
                    </div>
                <div className="row">
                <div className="col-6" style={{borderRight:"2px red solid", justifyContent: "center", display: "flex"}}>

                        <input type="file" accept="audio/mp3" id="file-input" onChange={handleSaveRecording} style={{ display: 'none' }} />
                        <label htmlFor="file-input" className="file-input-label">
                            Upload Audio
                        </label>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-5" > 
                    {/* <AvatarUpload /> */}
                    </div>
                    <div className="col-4" ></div>
                </div>
                <div className="row">
                <div className="col-6" style={{borderRight:"2px red solid"}}>
                  <VoiceRecorder/>

                  <AudiosDisplay />
                </div>
                <div className="col-6">
                  <div class="slanted-text-container">
                        <h1 class="slanted-text">Coming Soon!!</h1>
                  </div>
                </div>
                </div>
            </div>
            <div>
                <BottomSection />
            </div>
        </div>
    );
}

export default Create;
