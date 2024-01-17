"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

export default function Join({params}) {

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

  	// update a event
	const handleSubmit = async (e) => {
		e.preventDefault();

		
		/* 這裡把選擇者的時間加入result */
		const newPick = {
			name: userName,
			picks: picks,
		};
		result.push(newPick);
		
		console.log("click submit, update result: ", event.result);
		// console.log("click submit, newPicks: ", newPick);

		try {
		 	const res = await fetch(`/api/event/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					desc: desc,
					result: event.result,
				}),
		  	});

			if (res.ok) {
				const data = await res.json();
			} else {
				throw new Error("Failed to update event.");
			}
		} catch (err) {
			console.error(err);
		}
	}

  
  
  if (!event) {
    return <div>Loading...</div>;
  }

  const { result, desc } = event;

  return (
    
    <div className="">
	{/* Event Name */}
	<div className='flex flex-col justify-center items-center'>
		<p className="text-2xl font-bold mb-2 mt-10">{desc.title}</p>
	</div>

	{/* User Name */}
	<div className='flex flex-col justify-center items-center'>
		<p className="text-2xl font-bold mb-2 mt-10">My Name:</p>
		<input 
			className="border rounded p-1 h-8" 
			type="text"
			value={userName}
			onChange={(e) => {setUserName(e.target.value)}}
		/>
	</div>

	{/* Selected Time */}
	<div className="selected-time flex flex-row justify-center items-center gap-5">
		<div className="my-time my-10 bg-white">
			<p className="text-center">My Time:</p>   {/* 這裡更新使用者選擇的時間在picks */}
			<SelectGrid EventDesc={desc} picks={picks} onPicksChange={handlePicksChange}/>  
		</div>
		<div className="other-time my-10 bg-white">
			<p className="text-center">Other's Time:</p>
			<ResultGrid EventData={event}/>
		</div>
	</div>

	{/* Submit */}
	<div className="flex p-6 justify-center items-center">
		<button
			type="submit"
			onClick={handleSubmit} 
			className="items-center px-4 py-2 rounded-lg flex z-50 shadow-lg">
			<p>SUBMIT</p>
		</button> 
		</div>
    </div>
    
  	)
};

// export default Join;
