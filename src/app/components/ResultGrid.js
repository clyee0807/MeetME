"use client";
import React, { useState, useEffect } from 'react';

const daysCode = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// for testing
const test_eventDesc = {
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

const test_result = [
    {
        name: "Sally",
        picks: [
            "2023/09/17 02:00",
            "2023/09/17 03:00",
            "2023/09/17 00:00",
            "2023/09/17 01:00",
            "2023/09/17 04:00",
            "2023/09/17 05:00",
            "2023/09/17 06:00",
            "2023/09/17 07:00",
            "2023/09/17 08:00"
        ]
    },
    {
        name: "John",
        picks: [
            "2023/09/19 02:00",
            "2023/09/17 03:00",
            "2023/09/17 00:00",
            "2023/09/19 01:00",
        ]
    }
]

const ResultGrid = (props) => {
    // console.log("props: ", props);
    const eventInfo = props.EventData.desc;
    const attendlist = props.EventData.result;

    // console.log("eventData: ", eventInfo);
    // console.log("attendlist: ", attendlist);
  
    // const availableDates = eventInfo.availableDates.sort();
    // const availableTimes = eventInfo.availableTimes.sort();   
    const availableDates = test_eventDesc.availableDates.sort(); 
    const availableTimes = test_eventDesc.availableTimes.sort();
    const result = test_result;


	const [picks, setPicks] = useState([]);

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

    function countAttendee(result) {
        // 0 attendee: white, 1 attendee: light blue, 2 attendee: blue
        const countMap = new Map();
        
        result.forEach((attendee) => {
            attendee.picks.forEach((pick) => {
                if (countMap.has(pick)) {
                    countMap.set(pick, countMap.get(pick) + 1);
                } else {
                    countMap.set(pick, 1);
                }
            });
        });
    
        return countMap;
    }
    const attendeeCounts = countAttendee(result);
    console.log("attendeeCounts: ", attendeeCounts);


    return(
    <div className='w-80 overflow-scroll justify-center items-center px-8 py-5 my-10 rounded-lg bg-white'>
        <div className='flex flex-rows'>
            {availableDates.map((date, dateidx) => (
                <div key={date}>
                    <div className="event-date px-2">{date}</div>
                    <div className='text-center'>{getWeekDay(date)}</div>
                    <div className="time-col grid grid-rows-12 grid-flow-col">
                        {availableTimes.map((time, timeidx) => {
                            const count = attendeeCounts.get(dateFormat(dateidx, timeidx)) || 0;
                            let bgColor = 'bg-white';
                            if (count === 1) {
                                bgColor = 'bg-[#E6EAEF]';
                            } else if (count === 2) {
                                bgColor = 'bg-[#809BBF]';
                            } else {
                                bgColor = 'bg-blue';
                            }
                            return (
                                <div key={time} className={`text-center py-1 m-1 border border-[#809BBF] rounded-lg ${bgColor}`}>
                                    {time}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            
        </div>
    </div>
    
    );
};

export default ResultGrid;