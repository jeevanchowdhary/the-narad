import React, { useState } from 'react';

const AudioUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [text, setText] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFile || !text) {
            alert('Please select a file and enter text first!');
            return;
        }
        
        const formData = new FormData();
        formData.append('audio', selectedFile);
        formData.append('text', text);
        console.log("About to call API")
        console.log(formData)

        try {
            const response = await fetch('https://api.play.ht/api/v2/cloned-voices/instant/', {
                method: 'POST',
                headers: {
                    'Authorization': 'a66954f08b35499c98c00b896e913d64',
                    'X-USER-ID': 'jCgD29YYFzXcSvCmreuQZW8Uszm1'
                },
                body: formData
            });

            const result = await response.json();
            if (result.audioUrl) {
                setUploadStatus(`Audio generated: ${result.audioUrl}`);
            } else {
                setUploadStatus(result.message || 'Upload failed!');
            }
        } catch (error) {
            setUploadStatus('Upload failed!');
            console.error('Error uploading the file:', error);
        }
    };

    return (
        <div>
            <input type="file" id="file-input" onChange={handleFileChange} accept="audio/mp3" />
            <label htmlFor="file-input" className="file-input-label">
                Upload Audio
            </label>
            <textarea 
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text here"
                rows="4"
                cols="50"
            ></textarea>
            <button onClick={handleUpload}>Upload</button>
            <p style={{ color: 'blue' }}>{uploadStatus}</p>
        </div>
    );
};

export default AudioUpload;
