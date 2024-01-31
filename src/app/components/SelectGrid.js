"use client";
import React, { useState, useEffect } from 'react';

const daysCode = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const SelectGrid = ({EventDesc, picks, onPicksChange}) => {
    
    // console.log("props: ", props);

    const availableDates = EventDesc.availableDates.sort();
    const availableTimes = EventDesc.availableTimes.sort();    

    // let picks = picks;


	// const [name, setName] = useState("");
	// const [picks, setPicks] = useState([]);

    // console.log("sort dates: ", availableDates);
    // console.log("sort times: ", availableTimes);

    function getWeekDay(date) {
        const dateobj = new Date(date);
        let dayNum = dateobj.getDay();
        return daysCode[dayNum];
    }

    function dateFormat(dateidx, timeidx) {
        const date = availableDates[dateidx].toString();
        const time = availableTimes[timeidx].toString();
        return date+" "+time;
    }

    function selectTimes(dateidx, timeidx) {
        // console.log("dateidx: ", dateidx);
        // console.log("timeidx: ", timeidx);

        const fulltime = dateFormat(dateidx, timeidx);

        if(picks.includes(fulltime)){
            // setPicks(picks.filter(picks => picks !== fulltime));
            const newPicks = picks.filter(picks => picks !== fulltime);
            onPicksChange(newPicks);
        } else {
            // setPicks([...picks, fulltime]);
            const newPicks = [...picks, fulltime];
            onPicksChange(newPicks);
        }
    }

    return(
    
    <div className='justify-center items-center px-8 py-5 my-10 rounded-lg bg-white'>
        <div className='flex flex-rows overflow-x-auto'>
            {availableDates.map((date, dateidx) => (
                <div>
                    <div className="event-date px-2 font-jura">{date}</div>
                    <div className='text-center font-jura'>{getWeekDay(date)}</div>
                    <div className="time-col grid grid-rows-12 grid-flow-col">
                        {availableTimes.map((time, timeidx) => (
                            picks.includes(dateFormat(dateidx, timeidx)) ?
                            <div className='text-center py-1 m-1 border border-[#809BBF] bg-[#809BBF] cursor-pointer rounded-lg'
                                onClick={() => selectTimes(dateidx, timeidx)}>{time}</div>
                            :<div className='text-center py-1 m-1 border border-[#809BBF] cursor-pointer rounded-lg hover:bg-[#E6EAEF]'
                                onClick={() => selectTimes(dateidx, timeidx)}>{time}</div>
                        ))}
                    </div>
                </div>
            ))}
            
        </div>
    </div>
    
    );
};

export default SelectGrid;