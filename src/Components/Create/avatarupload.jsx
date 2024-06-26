import React, { useState, useEffect } from 'react';
import { database } from "../LoginPage/firebase";
import { onAuthStateChanged } from "firebase/auth";
import './avatarupload.css'

const AvatarUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [userId, setUserId] = useState(null);


    const handleFileChange = (event) => {
        if (!userId) {
            alert("Please sign up to access this page");
                      // Redirect to the login page or another appropriate page
                      return;
          }
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(database, (user) => {
          if (!user) {
            // User is not authenticated
            // alert("Please sign up to access this page");
            // navigate("/loginpage");
          } else {
            setUserId(user.uid);
          }
        });
      
        return () => unsubscribe();
      }, []);

    // const handleUpload = async () => {
    //     if (!selectedFile || !text) {
    //         alert('Please select a file and enter text first!');
    //         return;
    //     }
        
    //     const formData = new FormData();
    //     formData.append('audio', selectedFile);
    //     formData.append('text', text);
    //     console.log("About to call API")
    //     console.log(formData)

    //     try {
    //         const response = await fetch('https://api.play.ht/api/v2/cloned-voices/instant/', {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': 'a66954f08b35499c98c00b896e913d64',
    //                 'X-USER-ID': 'jCgD29YYFzXcSvCmreuQZW8Uszm1'
    //             },
    //             body: formData
    //         });

    //         const result = await response.json();
    //         if (result.audioUrl) {
    //             setUploadStatus(`Audio generated: ${result.audioUrl}`);
    //         } else {
    //             setUploadStatus(result.message || 'Upload failed!');
    //         }
    //     } catch (error) {
    //         setUploadStatus('Upload failed!');
    //         console.error('Error uploading the file:', error);
    //     }
    // };

    return (
        <div>
            {/* <input type="file" id="image-input" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            <label htmlFor="image-input" className="file-input-label">
                Upload Avatar
            </label>
            
            <p style={{ color: 'blue' }}>{uploadStatus}</p> */
            <div class="slanted-text-container">
              <h1 class="slanted-text">Slanted Text Example</h1>
            </div>
            }
        </div>
    );
};

export default AvatarUpload;
