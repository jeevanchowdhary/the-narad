// ChapterContext.js
import React, { createContext, useContext, useState } from "react";

const ChapterContext = createContext();

export const ChapterProvider = ({ children }) => {
    const [chapters, setChapters] = useState(/* initial chapters data */);
    const [currentChapter, setCurrentChapter] =
        useState(/* initial currentChapter data */);

    const contextValue = {
        chapters,
        setChapters,
        currentChapter,
        setCurrentChapter,
    };

    return (
        <ChapterContext.Provider value={contextValue}>
            {children}
        </ChapterContext.Provider>
    );
};

export const useChapterContext = () => {
    return useContext(ChapterContext);
};
