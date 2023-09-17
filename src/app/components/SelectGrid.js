"use client";
import React, { useState, useEffect } from 'react';


// const eventData = {
//     title: "cLyee's Event",
//     selectedDates: ['2023/08/25', '2023/08/26', '2023/08/27', '2023/08/28'],
//     selectedTimes: ['00:00', '01:00', '03:00', '04:00', '05:00', '11:00', '12:00', '13:00', '14:00', '15:00']
// };
// "title": "cLyee's Event",
// "selectedDates": ["2023/08/25", "2023/08/26", "2023/08/27", "2023/08/28"],
// "selectedTimes": ["00:00", "01:00", "03:00", "04:00", "05:00", "11:00", "12:00", "13:00", "14:00", "15:00"],

const daysCode = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const SelectGrid = (props) => {
    
    const eventData = props.EventData;
    const selectedTimes = props.selectedTimes; //
    const setSelectedTimes = props.setSelectedTimes;

    function getWeekDay(date) {
        const dateobj = new Date(date);
        let dayNum = dateobj.getDay();
        return daysCode[dayNum];
    }

    function selectTimes(time) {
        if(selectedTimes.includes(time)){
            setSelectedTimes(selectedTimes.filter(selectedTime => selectedTime !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    }

    return(
    
    <div className='w-64 overflow-scroll justify-center items-center px-8 py-5 my-10 rounded-lg bg-white'>
        <div className='flex flex-rows'>
            {eventData.selectedDates.map((date, dateidx) => (
                <div>
                    <div className="event-date px-2">{date}</div>
                    <div className='text-center'>{getWeekDay(date)}</div>
                    <div className="time-col grid grid-rows-12 grid-flow-col">
                        {eventData.selectedTimes.map((time, timeidx) => (
                            selectedTimes.includes(time) ?
                            <div className='text-center py-1 m-1 border border-[#809BBF] bg-[#809BBF] cursor-pointer rounded-sm'
                                onClick={() => selectTimes(time)}>{time}</div>
                            :<div className='text-center py-1 m-1 border border-[#809BBF] cursor-pointer rounded-lg hover:bg-[#E6EAEF]'
                                onClick={() => selectTimes(time)}>{time}</div>
                        ))}
                    </div>
                </div>
            ))}
            
        </div>

    </div>
    
    );
};

export default SelectGrid;