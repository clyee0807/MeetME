"use client";
import React, { useState, useEffect } from "react";
import ResultGrid from "../components/ResultGrid";
import VotingResult from "../components/VotingResult";


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

export default function Result({params}) {

	const [event, setEvent] = useState(null);
	const [userName, setUserName] = useState("???");

	const [picks, setPicks] = useState([]);  // 該使用者選擇的時間
	const handlePicksChange = (newPicks) => {
		setPicks(newPicks);
	};

	// console.log("params: ", params);
	const {id} = params;

	// const {event} = await getEventById(id);
	useEffect(() => {
		const fetchData = async () => {
			const { id } = params;
			const fetchedEvent = await getEventById(id);
			setEvent(fetchedEvent.event);
		};
		fetchData();
	}, [params]);
  
  if (!event) {
    return <div>Loading...</div>;
  }

  const { result, desc } = event;

  return (
    
    <div className="mx-auto my-10 mx-8 p-3">
	<h1 className="text-7xl font-semibold font-jura">MeetME</h1>

	{/* Event Name */}
	<div className='flex flex-col justify-center items-center'>
		<p className="text-2xl font-bold mb-1 mt-8 font-jura">{desc.title}</p>
		<p className="font-jura">Great! The voting result is...</p>
	</div>

	<div className="other-time my-10 bg-white rounded-lg">
		{/* <ResultGrid EventData={event}/> */}
		<VotingResult EventData={event}/>
	</div>

	
    </div>
    
  	)
};

