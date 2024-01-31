"use client";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
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
	const router = useRouter();

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
				console.log("Success to push: ", data)
				// console.log("id = ", id);
				router.push(`/${id}`);
			} else {
				throw new Error("Failed to update event.");
			}
		} catch (err) {
			console.error(err);
		}
	}

	// const [isCopied, setIsCopied] = useState(false);
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			// setIsCopied(true);
			// setTimeout(() => setIsCopied(false), 1000);
			alert('Event URL has been copied!');
		} catch (err) {
			console.error('Failed to copy URL: ', err);
		}
	};
  
	if (!event) {
		return <div className="h-auto">Loading...</div>;
	}

	const { result, desc } = event;

  return (
    
    <div className="mx-auto my-10 mx-8 p-3">
	<h1 className="text-7xl font-semibold font-jura">MeetME</h1>

	{/* Event Name */}
	<div className='flex flex-col justify-center items-center'>
		<div className="flex flex-row mb-1 mt-8 ">		
			<p className="text-2xl font-boldfont-jura">{desc.title}</p>
			<button onClick={copyToClipboard} aria-label="Copy URL" className="ml-2 pt-1">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height=" 16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy">
					<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path>
				</svg>
			</button>
		</div>
		<p className="font-jura">Congratulations! You have join the event</p>
	</div>

	{/* User Name */}
	<div className='flex flex-col justify-center items-center'>
		<p className="text-2xl font-bold mb-2 mt-10 font-jura">Enter Your Name:</p>
		<input 
			className="border rounded p-1 h-6" 
			type="text"
			value={userName}
			onChange={(e) => {setUserName(e.target.value)}}
		/>
	</div>

	
	{/* Selected Time */}
	<div className="selected-time flex flex-row gap-5 mt-10">
		<div className="my-time my-10 px-4 pt-10 pb-20 bg-white w-1/2 rounded-lg">
			<p className="font-bold text-xl text-center font-jura">Your Time:</p>   {/* 這裡更新使用者選擇的時間在picks */}
			<SelectGrid EventDesc={desc} picks={picks} onPicksChange={handlePicksChange}/>  
		</div>
		<div className="other-time my-10 px-4 pt-10 pb-20 bg-white w-1/2 rounded-lg">
			<p className="font-bold text-xl text-center font-jura">Other's Time:</p>
			<ResultGrid EventData={event}/>
		</div>
	</div>


	{/* Submit */}
	<div className="flex p-6 justify-center items-center">
		<button
			type="submit"
			onClick={handleSubmit} 
			className="items-center px-14 py-5 rounded-lg flex z-50 shadow-lg bg-[#E6EAEF]">
			<p>SUBMIT</p>
		</button> 
		</div>
    </div>
    
  	)
};

// export default Join;
