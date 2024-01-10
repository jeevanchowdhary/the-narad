import React from "react";

function PageNavigation({ chapters, currentChapter, setCurrentChapter }) {
    return (
        <div className="page-navigation">
            {chapters.map((chapter, chapterIndex) => (
                <button
                    key={chapterIndex}
                    onClick={() => setCurrentChapter(chapterIndex)}
                    className={chapterIndex === currentChapter ? "active" : ""}
                >
                    {chapter.name}
                </button>
            ))}
        </div>
    );
}

export default PageNavigation;
