"use client";
import React, { useState, useEffect } from "react";
import SelectGrid from "../../components/SelectGrid";
import ResultGrid from "../../components/ResultGrid";


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
          <SelectGrid EventDesc={desc}/>
        </div>
        <div className="other-time my-10 bg-white">
          <p className="text-center">Other's Time:</p>
          {/* <ResultGrid EventData={desc}/> */}
        </div>
      </div>
    </div>
    
  )
}
  