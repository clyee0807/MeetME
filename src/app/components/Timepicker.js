"use client";
import React, { useState, useEffect } from 'react';


const TimePicker = (props) => {
    const selectedTimes = props.selectedTimes;
    const setSelectedTimes = props.setSelectedTimes;

    const timeCode = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    
    function selectTimes(time) {
        if(hasSelectedTime(time)){
            setSelectedTimes(selectedTimes.filter(selectedTime => selectedTime !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    }

    // check if the date been selected
    function hasSelectedTime(time) {
        let selected = false;
        selectedTimes.map((t, tidx) => {
            if(t === time){
                selected = true;
            }
        })
        if(selected){
            return true;
        } else {
            return false;
        }
    }

    return(
    <>
        <div className='justify-center items-center px-8 py-5 my-10 rounded-lg bg-white'>
            <div className='timepicker grid grid-rows-12 grid-flow-col gap-1 my-1'>
                {timeCode.map((time, timeidx) => (
                    hasSelectedTime(time) ? 
                    <div time={timeidx} className=
                        'time text-center px-3 py-1 border border-[#809BBF] bg-[#809BBF] cursor-pointer rounded-sm'
                        onClick={() => selectTimes(time)}
                    >{time}</div> :
                    <div time={timeidx} className=
                        'time text-center px-3 py-1 border border-[#809BBF] cursor-pointer rounded-sm hover:bg-[#E6EAEF]'
                        onClick={() => selectTimes(time)}
                    >{time}</div>
                ))}
            </div>
   
        </div>
    </>
    );
};

export default TimePicker;