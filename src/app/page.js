"use client";
import React, { useState } from "react";
import DatePicker from "./components/Datepicker";
import TimePicker from "./components/Timepicker";

const Home = () => {

  const [selectedDates, setSelectedDates] = useState([]);


  console.log(selectedDates);

  return (
    // container bg-[#F7F2ED]
    <div className="">
        {/* Event Name */}
        <div className='flex flex-col justify-center items-center'>
          <p className="text-2xl font-bold mb-2 mt-10">Event Name:</p>
          <input className="border rounded p-1 h-8" type="text"/>
        </div>

        {/* Available Dates */}
        <div className='flex flex-col justify-center items-center mt-10'>
          <p className="text-2xl font-bold">Available Dates:</p>
          <DatePicker selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>  
        </div>
          

        {/* Available Times */}
        <div className='flex flex-col justify-center items-center mt-10'>
          <p className="text-2xl font-bold">Available Times:</p>
          <TimePicker/>
        </div>

        {/* Submit */}
        <div className="flex p-6 justify-center items-center">
          <p className="text-lg px-3 py-2 text-center border bg-white drop-shadow-md rounded-lg">SUBMIT</p>
        </div>
    </div>
  )
}

export default Home;