"use client";
import React, { useState, useEffect } from 'react';


const ResultGrid = (props) => {
    const eventData = props.EventData;
    const attendlist = props.attendlist;

    return(
    <div className='w-64 snap-x snap-mandatory overflow-scroll justify-center items-center px-8 py-5 my-10 rounded-lg bg-white'>
        <div className='event-dates flex flex-rows'>
            {eventData.selectedDates.map((date, dateidx) => (
                <div className="snap-center shrink-0 px-1">{date}</div>
            ))}
            
        </div>

    </div>
    );
};

export default ResultGrid;