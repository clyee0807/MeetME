"use client";
import React, { useState, useEffect } from "react";
import SelectGrid from "../../components/SelectGrid";
import ResultGrid from "../../components/ResultGrid";


// const myEvent = {
//   title: "cLyee's Event",
//   selectedDates: ['2023/08/25', '2023/08/26', '2023/08/27', '2023/08/28'],
//   selectedTimes: ['00:00', '01:00', '03:00', '04:00', '05:00', '11:00', '12:00', '13:00', '14:00', '15:00']
// };

// const attendlist = [
//   {
//     name: 'John',
//     selected: 
//     {
//       date: ['2023/08/25', '2023/08/27', '2023/08/28'],
//       time: [[0, 1, 12], [1, 14], [11, 12, 13, 14]]
//     }
    
//   },
//   {
//     name: 'Meggie',
//     selected: 
//     {
//       date: [[8,25], [8,27], [8,28]],
//       time: [[12], [0, 1, 3], [11, 12, 13, 14]]
//     }
//   }
// ];
// console.log(attendlist[0].selected.date[0]);

const getEventById = async(id) => {
  try {
    const res = await fetch(`/api/event/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch event");
    }
    return res.json();

  } catch (err) {
    console.log(err);
  }
};

export default async function Join({params}) {
  const {id} = params;
  // console.log("id: ", id);

  const {event} = await getEventById(id);
  const {result, desc} = event;

  // const {title, selectedDates, selectedTimes} = event;
  // const [selectedTimes, setSelectedTimes] = useState([]);

  return (
    
    <div className="">
      {/* Event Name */}
      <div className='flex flex-col justify-center items-center'>
        <p className="text-2xl font-bold mb-2 mt-10">{desc.title}</p>
      </div>

      {/* Selected Time */}
      <div className="selected-time flex flex-row justify-center items-center gap-5">
        <div className="my-time my-10 bg-white">
          <p className="text-center">My Time:</p>
          {/* <SelectGrid EventData={myEvent} selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes}/> */}
        </div>
        <div className="other-time my-10 bg-white">
          <p className="text-center">Other's Time:</p>
          {/* <ResultGrid EventData={myEvent} attendlist={attendlist}/> */}
        </div>
      </div>
    </div>
    
  )
}
  