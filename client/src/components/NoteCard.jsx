import React from 'react';
import {useConvertDate} from "../utils/useConvertDate"

const NoteCard = ({ title = "Title", content = "Content here...", date = 'unknown' }) => {
    return (
        <div className="flex flex-col justify-start items-start bg-tertiary min-w-[600px] max-w-[800px] my-3 mx-auto p-2 px-3 rounded-md text-white">
            <h2>{title}</h2>
            <div className="flex flex-row justify-between items-center w-full">
                <p className="text-base">{content}</p>
                <span className="text-sm">
                    {useConvertDate(date).formattedDate} - {useConvertDate(date).formattedTime}    
                </span>
            </div>
        </div>
    );
};

export default NoteCard;