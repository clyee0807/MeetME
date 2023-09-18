"use client";
import React, { useState, useEffect } from 'react';

const daysCode = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const SelectGrid = (props) => {
    
    // const eventDesc = props.EventDesc;
    // console.log(eventDesc);

    const eventDesc = {
        title: '09182211',
        availableDates: [
            '2023/09/17',
            '2023/09/26',
            '2023/09/19',
            '2023/09/20',
            '2023/09/21',
            '2023/09/22',
            '2023/09/23',
            '2023/09/24',
            '2023/09/25'
        ],
        availableTimes: [
            '02:00', '03:00',
            '00:00', '01:00',
            '04:00', '05:00',
            '06:00', '07:00',
            '08:00'
        ]
    };
    const availableDates = eventDesc.availableDates.sort(); 
    const availableTimes = eventDesc.availableTimes.sort();
    


	const [name, setName] = useState("");
	const [picks, setPicks] = useState([]);

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
            setPicks(picks.filter(picks => picks !== fulltime));
        } else {
            setPicks([...picks, fulltime]);
        }
    }

    return(
    
    <div className='w-80 overflow-scroll justify-center items-center px-8 py-5 my-10 rounded-lg bg-white'>
        <div className='flex flex-rows'>
            {availableDates.map((date, dateidx) => (
                <div>
                    <div className="event-date px-2">{date}</div>
                    <div className='text-center'>{getWeekDay(date)}</div>
                    <div className="time-col grid grid-rows-12 grid-flow-col">
                        {availableTimes.map((time, timeidx) => (
                            picks.includes(dateFormat(dateidx, timeidx)) ?
                            <div className='text-center py-1 m-1 border border-[#809BBF] bg-[#809BBF] cursor-pointer rounded-sm'
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