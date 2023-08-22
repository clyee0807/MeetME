"use client";
import React, { useState, useEffect } from 'react';


const TimePicker = () => {

   const timeCode = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    return(
    <>
        <div className='justify-center items-center px-8 py-5 my-10 rounded-lg bg-white'>
            <div className='timepicker grid grid-cols-2 gap-1 my-1'>
                {timeCode.map((time, timeidx) => (
                    <div time={timeidx} className=
                        'time text-center px-3 py-1 border border-[#809BBF] cursor-pointer rounded-sm hover:bg-[#E6EAEF]'
                    >{time}</div>
                ))}
            </div>
   
        </div>
    </>
    );
};

export default TimePicker;