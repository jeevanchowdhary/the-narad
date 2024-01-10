// import React, { useState, useRef, useEffect, useCallback } from "react";
// import "./styles.css";
// import FlipPage from "react-flip-page";
// import chaptersData from "./chapters.json"; // Import chapters.json as a module
// import Manual_AutoRead from "./manual&auto_read/Manual_AutoRead";
// import PageNavigation from "./Components/Books/PageNavigation";
// import BooksScroll from "./Components/Books/BooksScroll";
// import "./manual&auto_read/Rstyles.css";

// const FlipBook = () => {
//     const [chapters, setChapters] = useState(chaptersData); // State to store chapters data
//     const [currentChapter, setCurrentChapter] = useState(0);
//     const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//     const [currentPageIndex, setCurrentPageIndex] = useState(0);
//     const [selectedVoices, setSelectedVoices] = useState([]);
//     const [voiceSpeed, setVoiceSpeed] = useState(1); // Initial voice speed
//     const flipPageRef = useRef(null);
//     const [voices, setVoices] = useState([]);
//     const [shouldStartAudio, setShouldStartAudio] = useState(false);
//     const [displayMaleVoices, setDisplayMaleVoices] = useState(false);
//     const [displayFemaleVoices, setDisplayFemaleVoices] = useState(false);
//     const [audioCompleted, setAudioCompleted] = useState(false);
//     const [dropdownDisabled, setDropdownDisabled] = useState(true); // Initially disable the dropdown
//     const [isPlaying, setIsPlaying] = useState(false);
//     const currentUtteranceRef = useRef(null);

//     const handlePlayPause = () => {
//         setIsPlaying(!isPlaying);
//         if (isPlaying) {
//             speechSynthesis.resume();
//             console.log("audio paly");
//         } else {
//             speechSynthesis.pause();
//             console.log("audio pause");
//         }
//     };
//     const handlePause = () => {
//         console.log("SpeechSynthesisUtterance: pause event");
//     };

//     const handleResume = () => {
//         console.log("SpeechSynthesisUtterance: resume event");
//     };

//     useEffect(() => {
//         // Initialize voices when the component mounts
//         initVoices();

//         // Add an event listener for voiceschanged event
//         speechSynthesis.addEventListener("voiceschanged", initVoices);

//         // Remove the event listener when the component unmounts
//         return () => {
//             speechSynthesis.removeEventListener("voiceschanged", initVoices);
//         };
//     }, []);

//     useEffect(() => {
//         fetch("./chapters.json")
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setChapters(data); // Update the chapters state with fetched data
//             })
//             .catch((error) => {
//                 console.error("Error fetching chapters data:", error);
//             });
//     }, []);
//     const initVoices = () => {
//         // Retrieve the available voices and update the state
//         const voiceList = speechSynthesis.getVoices();
//         setVoices(voiceList);
//     };

//     const speakText = useCallback(
//         (text, selectedVoices) => {
//             if (selectedVoices.length === 0) {
//                 return; // No voices selected, do nothing
//             }

//             // Strip HTML tags from the text
//             const strippedText = text.replace(/<[^>]*>/g, "");

//             const utterance = new SpeechSynthesisUtterance(strippedText);

//             utterance.voice = selectedVoices[0];
//             utterance.rate = voiceSpeed;

//             // Add event listeners for pause and resume events
//             utterance.onpause = handlePause;
//             utterance.onresume = handleResume;

//             currentUtteranceRef.current = utterance;

//             utterance.onend = () => {
//                 setIsAudioPlaying(false);
//                 setAudioCompleted(true);
//             };

//             speechSynthesis.speak(utterance);
//         },
//         [voiceSpeed]
//     );

//     useEffect(() => {
//         if (isAudioPlaying && shouldStartAudio) {
//             speakText(
//                 chapters[currentChapter].pages[currentPageIndex],
//                 selectedVoices
//             );
//         } else {
//             speechSynthesis.cancel();
//         }
//     }, [
//         isAudioPlaying,
//         currentChapter,
//         currentPageIndex,
//         selectedVoices,
//         shouldStartAudio,
//         voiceSpeed,
//         speakText,
//         chapters,
//     ]);

//     useEffect(() => {
//         setIsAudioPlaying(false);
//         setCurrentPageIndex(0);
//         flipPageRef.current.gotoPage(0);
//         setShouldStartAudio(false);
//         setAudioCompleted(false);
//     }, [currentChapter]);

//     useEffect(() => {
//         const voiceSelect = document.getElementById("voiceSelect");

//         if (voiceSelect) {
//             const handleVoiceChange = () => {
//                 setIsAudioPlaying(false);
//                 setShouldStartAudio(false);
//                 speechSynthesis.cancel();
//             };

//             voiceSelect.addEventListener("change", handleVoiceChange);

//             return () => {
//                 voiceSelect.removeEventListener("change", handleVoiceChange);
//             };
//         }
//     }, []);

//     const filteredVoices = voices.filter((voice) => {
//         const voiceName = voice.name.toLowerCase();
//         if (displayMaleVoices === true) {
//             return (
//                 voiceName.includes("microsoft david") ||
//                 voiceName.includes("microsoft ravi") ||
//                 voiceName.includes("microsoft mark") ||
//                 voiceName.includes("google uk english male")
//             );
//         } else if (displayFemaleVoices === true) {
//             return (
//                 voiceName.includes("microsoft heera") ||
//                 voiceName.includes("google हिन्दी") || // Use the correct name
//                 voiceName.includes("microsoft zira") ||
//                 voiceName.includes("google uk english female")
//             );
//         } else {
//             return true;
//         }
//     });

//     const enableDropdown = () => {
//         setDropdownDisabled(false);
//     };

//     return (
//         <div className="flip-book-container">
//             <PageNavigation
//                 chapters={chapters}
//                 currentChapter={currentChapter}
//                 setCurrentChapter={setCurrentChapter}
//             />

//             <div
//                 style={{
//                     display: "flex",
//                     height: "70vh",
//                     position: "relative",
//                     width: "45%",
//                 }}
//             >
//                 <FlipPage
//                     orientation="horizontal"
//                     responsive={true}
//                     flipOnTouch={true}
//                     uncutPages={true}
//                     animationDuration={900}
//                     animationCurve="ease-in-out"
//                     ref={flipPageRef}
//                     onPageChange={(pageIndex) => {
//                         setIsAudioPlaying(false);
//                         setCurrentPageIndex(pageIndex);
//                         setShouldStartAudio(false);
//                         setAudioCompleted(false);
//                     }}
//                 >
//                     {chapters[currentChapter].pages.map(
//                         (content, pageIndex) => (
//                             <article key={pageIndex} className="page">
//                                 <h2>{chapters[currentChapter].name}</h2>
//                                 <div
//                                     dangerouslySetInnerHTML={{
//                                         __html: content,
//                                     }}
//                                 />
//                                 <div className="page-number">
//                                     {pageIndex + 1} of{" "}
//                                     {chapters[currentChapter].pages.length}
//                                 </div>
//                             </article>
//                         )
//                     )}
//                 </FlipPage>
//             </div>
//             <div>
//                 <button
//                     className="start-stop-btn"
//                     disabled={dropdownDisabled}
//                     onClick={() => {
//                         if (isAudioPlaying) {
//                             setIsAudioPlaying(false);
//                             setShouldStartAudio(false);
//                         } else {
//                             setIsAudioPlaying(true);
//                             setShouldStartAudio(true);
//                             setAudioCompleted(false);
//                         }
//                     }}
//                 >
//                     {audioCompleted
//                         ? "Start"
//                         : isAudioPlaying
//                         ? "Stop"
//                         : "Start"}
//                 </button>
//             </div>
//             <div className="Right-container">
//                 <div className="Manual-Auto-Read">
//                     <div className="main-cont">
//                         <div>
//                             <p className="manual">Manual Read</p>
//                         </div>
//                         <div>
//                             <label className="switch">
//                                 <input type="checkbox" className="checkbox" />
//                                 <div className="sliderBtn"></div>
//                             </label>
//                         </div>
//                         <div>
//                             <p className="auto">Auto Read</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="voice-selection">
//                     <div className="voice-sec-btns">
//                         <button
//                             onClick={() => {
//                                 setDisplayMaleVoices(true);
//                                 enableDropdown();
//                             }}
//                         >
//                             <img className="male" src="male.png" alt="male" />
//                         </button>
//                         <button
//                             onClick={() => {
//                                 setDisplayMaleVoices(false);
//                                 setDisplayFemaleVoices(true);
//                                 enableDropdown();
//                             }}
//                         >
//                             <img
//                                 className="female"
//                                 src="female.png"
//                                 alt="male"
//                             />
//                         </button>
//                     </div>
//                     <div className="voicedrop-down">
//                         <select
//                             id="voiceSelect"
//                             disabled={dropdownDisabled}
//                             onChange={(e) => {
//                                 const selectedVoiceName = e.target.value;
//                                 const selectedVoice = voices.find(
//                                     (voice) => voice.name === selectedVoiceName
//                                 );
//                                 setSelectedVoices([selectedVoice]);
//                             }}
//                         >
//                             <option value="" className="voiceSelect-dropdown">
//                                 Select voice
//                             </option>
//                             {filteredVoices.map((voice, index) => (
//                                 <option
//                                     className="voice-options"
//                                     key={index}
//                                     value={voice.name}
//                                 >
//                                     {voice.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="slidecontainer">
//                     <input
//                         disabled={dropdownDisabled}
//                         className="slider"
//                         type="range"
//                         min="0"
//                         max="2"
//                         step="0.5"
//                         value={voiceSpeed}
//                         onChange={(e) =>
//                             setVoiceSpeed(parseFloat(e.target.value))
//                         }
//                     />
//                     <p
//                         className="range-value"
//                         style={{ color: "white", fontSize: "small" }}
//                     >
//                         Voice Speed: {voiceSpeed}
//                     </p>
//                 </div>

//                 <div className="Play-pause-btn">
//                     <button
//                         disabled={dropdownDisabled}
//                         onClick={handlePlayPause}
//                     >
//                         {isPlaying ? "Play" : "Pause"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FlipBook;
// // 