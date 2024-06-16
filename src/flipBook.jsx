import React, { useState, useRef, useEffect, useCallback } from "react";
import "./styles.css";
import FlipPage from "react-flip-page";
import chaptersData from "./chapters.json"; // Import chapters.json as a module
import Manual_AutoRead from "./manual&auto_read/Manual_AutoRead";
import PageNavigation from "./Components/Books/PageNavigation";
import BooksScroll from "./Components/Books/BooksScroll";
import "./manual&auto_read/Rstyles.css";
import "./story2.css";
import { Link } from "react-router-dom";
import Background from "./Components/Background/Background";

const FlipBook = () => {
    const [maleVideoSrc, setMaleVideoSrc] = useState("male.mp4");
    const [femaleVideoSrc, setFemaleVideoSrc] = useState("female.mp4");
    const [videoRef, setVideoRef] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [readMode, setReadMode] = useState("manual");
    const [chapters, setChapters] = useState(chaptersData); // State to store chapters data
    const [currentChapter, setCurrentChapter] = useState(0);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [selectedVoices, setSelectedVoices] = useState([]);
    const [voiceSpeed, setVoiceSpeed] = useState(1); // Initial voice speed
    const flipPageRef = useRef(null);
    const [voices, setVoices] = useState([]);
    const [shouldStartAudio, setShouldStartAudio] = useState(false);
    const [displayMaleVoices, setDisplayMaleVoices] = useState(false);
    const [displayFemaleVoices, setDisplayFemaleVoices] = useState(false);
    const [audioCompleted, setAudioCompleted] = useState(false);
    const [dropdownDisabled, setDropdownDisabled] = useState(true); // Initially disable the dropdown
    const [isPlaying, setIsPlaying] = useState(false);
    const currentUtteranceRef = useRef(null);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            speechSynthesis.resume();
            console.log("audio paly");
        } else {
            speechSynthesis.pause();
            console.log("audio pause");
        }
    };
    const handlePause = () => {
        console.log("SpeechSynthesisUtterance: pause event");
    };

    const handleResume = () => {
        console.log("SpeechSynthesisUtterance: resume event");
    };

    useEffect(() => {
        // Initialize voices when the component mounts
        initVoices();

        // Add an event listener for voiceschanged event
        speechSynthesis.addEventListener("voiceschanged", initVoices);

        // Remove the event listener when the component unmounts
        return () => {
            speechSynthesis.removeEventListener("voiceschanged", initVoices);
        };
    }, []);

    useEffect(() => {
        fetch("./chapters.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setChapters(data); // Update the chapters state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching chapters data:", error);
            });
    }, []);
    const initVoices = () => {
        // Retrieve the available voices and update the state
        const voiceList = speechSynthesis.getVoices();
        setVoices(voiceList);
    };

    const speakText = useCallback(
        (text, selectedVoices) => {
            if (selectedVoices.length === 0) {
                return; // No voices selected, do nothing
            }

            // Strip HTML tags from the text
            const strippedText = text.replace(/<[^>]*>/g, "");

            const utterance = new SpeechSynthesisUtterance(strippedText);

            utterance.voice = selectedVoices[0];
            utterance.rate = voiceSpeed;

            // Add event listeners for pause and resume events
            utterance.onpause = handlePause;
            utterance.onresume = handleResume;

            currentUtteranceRef.current = utterance;

            utterance.onend = () => {
                console.log("Audio playback ended");

                setIsAudioPlaying(false);
                setAudioCompleted(true);

                if (readMode === "auto") {
                    // Auto Read logic
                    if (
                        currentPageIndex + 1 <
                        chapters[currentChapter].pages.length
                    ) {
                        console.log("Initiating audio for the next page");
                        setCurrentPageIndex(currentPageIndex + 1);
                        flipPageRef.current.gotoPage(currentPageIndex + 1);
                        speakText(
                            chapters[currentChapter].pages[
                                currentPageIndex + 1
                            ],
                            selectedVoices
                        );
                    }
                }
            };

            console.log("Initiating audio playback");
            speechSynthesis.speak(utterance);
        },
        [
            voiceSpeed,
            readMode,
            currentPageIndex,
            chapters,
            speakText,
            selectedVoices,
        ]
    );

    useEffect(() => {
        if (isAudioPlaying && shouldStartAudio) {
            speakText(
                chapters[currentChapter].pages[currentPageIndex],
                selectedVoices
            );

            // Start playing the video when audio starts
            if (videoRef) {
                videoRef.play().then(() => {
                    setIsVideoPlaying(true);
                });
            }
        } else {
            speechSynthesis.cancel();

            // Pause or stop the video when audio stops
            if (videoRef) {
                videoRef.pause();
                setIsVideoPlaying(false);
            }
        }
    }, [
        isAudioPlaying,
        currentChapter,
        currentPageIndex,
        selectedVoices,
        shouldStartAudio,
        voiceSpeed,
        speakText,
        chapters,
        videoRef,
    ]);

    useEffect(() => {
        setIsAudioPlaying(false);
        setCurrentPageIndex(0);
        flipPageRef.current.gotoPage(0);
        setShouldStartAudio(false);
        setAudioCompleted(false);
    }, [currentChapter]);

    useEffect(() => {
        const voiceSelect = document.getElementById("voiceSelect");

        if (voiceSelect) {
            const handleVoiceChange = () => {
                setIsAudioPlaying(false);
                setShouldStartAudio(false);
                speechSynthesis.cancel();
            };

            voiceSelect.addEventListener("change", handleVoiceChange);

            return () => {
                voiceSelect.removeEventListener("change", handleVoiceChange);
            };
        }
    }, []);

    const filteredVoices = voices.filter((voice) => {
        const voiceName = voice.name.toLowerCase();
        if (displayMaleVoices === true) {
            return (
                voiceName.includes("microsoft david") ||
                voiceName.includes("microsoft ravi") ||
                voiceName.includes("microsoft mark") ||
                voiceName.includes("google uk english male")
            );
        } else if (displayFemaleVoices === true) {
            return (
                voiceName.includes("microsoft heera") ||
                voiceName.includes("google हिन्दी") || // Use the correct name
                voiceName.includes("microsoft zira") ||
                voiceName.includes("google uk english female")
            );
        } else {
            return true;
        }
    });

    const enableDropdown = () => {
        setDropdownDisabled(false);
    };

    return (
        <div >
        <div className="flip-book-container">
            {/* <PageNavigation
                chapters={chapters}
                currentChapter={currentChapter}
                setCurrentChapter={setCurrentChapter}
            /> */}

                    

                    

            <div
                style={{
                    display: "flex",
                    height: "70vh",
                    position: "relative",
                    width: "65%",
                }}
            >
                <FlipPage 
                    orientation="horizontal"
                    responsive={true}
                    flipOnTouch={true}
                    uncutPages={true}
                    animationDuration={900}
                    animationCurve="ease-in-out"
                    ref={flipPageRef}
                    onPageChange={(pageIndex) => {
                        setIsAudioPlaying(false);
                        setCurrentPageIndex(pageIndex);
                        setShouldStartAudio(false);
                        setAudioCompleted(false);
                    }}
                >
                    {chapters[currentChapter].pages.map(
                        (content, pageIndex) => (
                            <article key={pageIndex} className="page" style={{
                                background:"white",
                            }}>
                                <h2>{chapters[currentChapter].name}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                                <div className="page-number">
                                    {pageIndex + 1} of{" "}
                                    {chapters[currentChapter].pages.length}
                                </div>
                            </article>
                        )
                    )}
                </FlipPage>
            </div>
            <div>
                <button
                    className="start-stop-btn"
                    disabled={dropdownDisabled}
                    onClick={() => {
                        if (isAudioPlaying) {
                            setIsAudioPlaying(false);
                            setShouldStartAudio(false);
                        } else {
                            setIsAudioPlaying(true);
                            setShouldStartAudio(true);
                            setAudioCompleted(false);

                            if (readMode === "auto") {
                                // Auto Read logic
                                speakText(
                                    chapters[currentChapter].pages[
                                        currentPageIndex
                                    ],
                                    selectedVoices
                                );
                            } else {
                                // Manual Read logic
                                console.log("Manual Read");
                            }
                        }
                    }}
                >
                    {audioCompleted
                        ? "Start"
                        : isAudioPlaying
                        ? "Stop"
                        : "Start"}
                </button>
            </div>

            <div className="Right-container">
                <div className="videoContainer">
                    {displayMaleVoices && !displayFemaleVoices && (
                        <div>
                        <video
                            ref={(ref) => setVideoRef(ref)}
                            width="100%"
                            height="160vh"
                            controls
                            loop
                        >
                            <source src={maleVideoSrc} type="video/mp4" />
                        </video>
                        <button
                        onClick={() => window.open(maleVideoSrc, '_blank')}
                        style={{
                            display: 'block',
                            backgroundColor:'#007bff',
                            padding:'5px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            border:'none',
                            borderRadius: '5px'
                        }}
                        >
                            View in New Tab
                        </button>
                        </div>
                    )}
                    
                    {displayFemaleVoices && !displayMaleVoices && (
                        <div>
                        <video
                            ref={(ref) => setVideoRef(ref)}
                            width="100%"
                            height="160vh"
                            controls
                            loop
                        >
                            <source src={femaleVideoSrc} type="video/mp4" />
                        </video>
                        <button
                        onClick={() => window.open(femaleVideoSrc, '_blank')}
                        style={{
                            display: 'block',
                            backgroundColor:'#007bff',
                            fontSize: '12px',
                            padding:'5px',
                            cursor: 'pointer',
                            border:'none',
                            borderRadius: '5px'
                        }}
                        >
                            View in New Tab
                        </button>
                        </div>
                    )}
                    
                    {!displayMaleVoices && !displayFemaleVoices && (
                        // Render a placeholder or default content when no video is displayed
                        <div>No video selected</div>
                    )}
                </div>
                <div className="Manual-Auto-Read">
                    <div className="main-cont">
                        <div>
                            <p className="auto">Auto Read</p>
                        </div>
                        <div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={readMode === "auto"}
                                    onChange={() => {
                                        setReadMode((prevMode) =>
                                            prevMode === "auto"
                                                ? "manual"
                                                : "auto"
                                        );
                                        console.log(
                                            `Switched to ${
                                                readMode === "auto"
                                                    ? "Manual"
                                                    : "Auto"
                                            } Read`
                                        );
                                    }}
                                />
                                <div className="sliderBtn"></div>
                            </label>
                        </div>

                        <div>
                            <p className="manual">Manual Read</p>
                        </div>
                    </div>
                </div>
                <div className="voice-selection">
                    <div className="voice-sec-btns">
                        <button
                            onClick={() => {
                                setDisplayMaleVoices(true);
                                setDisplayFemaleVoices(false);
                                enableDropdown();
                            }}
                        >
                            <img className="male" src="male.jpg" alt="male" />
                        </button>
                        <button
                            onClick={() => {
                                setDisplayMaleVoices(false);
                                setDisplayFemaleVoices(true);
                                enableDropdown();
                            }}
                        >
                            <img
                                className="female"
                                src="female.jpg"
                                alt="male"
                            />
                        </button>
                    </div>
                    <div className="voicedrop-down">
                        <select
                            id="voiceSelect"
                            disabled={dropdownDisabled}
                            onChange={(e) => {
                                const selectedVoiceName = e.target.value;
                                const selectedVoice = voices.find(
                                    (voice) => voice.name === selectedVoiceName
                                );
                                setSelectedVoices([selectedVoice]);
                            }}
                        >
                            <option value="" className="voiceSelect-dropdown">
                                Select voice
                            </option>
                            {filteredVoices.map((voice, index) => (
                                <option
                                    className="voice-options"
                                    key={index}
                                    value={voice.name}
                                >
                                    {voice.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="slidecontainer">
                    <input
                        disabled={dropdownDisabled}
                        className="slider"
                        type="range"
                        min="0"
                        max="2"
                        step="0.5"
                        value={voiceSpeed}
                        onChange={(e) =>
                            setVoiceSpeed(parseFloat(e.target.value))
                        }
                    />
                    <p
                        className="range-value"
                        style={{ color: "white", fontSize: "small" }}
                    >
                        Voice Speed: {voiceSpeed}
                    </p>
                </div>

                <div className="Play-pause-btn">
                    <button
                        disabled={dropdownDisabled}
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? "Play" : "Pause"}
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default FlipBook;
