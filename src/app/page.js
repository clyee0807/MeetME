"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "./components/Datepicker";
import TimePicker from "./components/Timepicker";
import { useRouter } from "next/navigation";

const Home = () => {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [selectedDates, setSelectedDates] = useState([]);
	const [selectedTimes, setSelectedTimes] = useState([]);
	
	const [isCreating, setisCreating] = useState(true);

	// 看是不是都填完了
	useEffect(() => { 
		if(title !== "" && selectedDates.length !== 0 && selectedTimes.length !== 0){
			setisCreating(false);  // done
		} else {
			setisCreating(true);
		}
	}, [title, selectedDates, selectedTimes]);

	function dateFormat(dateArray) {
		const [year, month, day] = dateArray;
	    const formattedDate = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;

    	return formattedDate;

	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(title);
		console.log(selectedDates);
		console.log(selectedTimes);

		// const formattedDates = dateFormatAndSort(selectedDates);
		// console.log(formattedDates);

		try {
			const res = await fetch('/api/event', {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json' 
				},
				body: JSON.stringify({
					result: [
						{
							name: "default",
							picks: ["2023/00/00 00:00"]
						}
					], 
					desc: {
						title,
						availableDates: selectedDates.map((date) => dateFormat(date)),
						// availableDates: selectedDates.map((date) => date.toString()),
						availableTimes: selectedTimes.map((time) => time.toString()),
					},
				}),
			});
			
			if (res.ok) {
				const data = await res.json(); // 從route.js接回來的
				// console.log("data from route.js: ", data);
				router.push('/created/' + data._id);
			} else {
				throw new Error("Failed to create new event.");
			}
			
		} catch (err) {
			console.error(err);
		} finally {
			setisCreating(false);
		}
	}

	return (
		<div className="mx-auto my-10 mx-8 p-3">
			<div className="flex flex-row items-end mb-3">
				<h1 className="text-7xl font-semibold font-jura">MeetME</h1>
				<p className="text-2xl text-center ml-3 font-jura">Simplifying Event Scheduling and Social Planning</p>
			</div>
			<p className=" mb-20 font-jura">In today's fast-paced world, coordinating schedules and organizing events with friends and colleagues can often be challenging. This is where "meetME" steps in – a website designed to streamline the process of event planning and scheduling. meetME is not just a tool; it's a social enabler, making it easier than ever to connect with others and create memorable experiences.</p>

			<div className="flex flex-row">
				<div className="left-col flex flex-col px-4 pt-10 pb-20 items-center bg-white rounded-2xl w-1/3 mr-2">
					{/* Event Name */}
					<p className="text-2xl font-bold mb-2 font-jura">Event Name:</p>
					<input 
						className="border rounded p-1 h-6 w-3/4" 
						type="text"
						value={title}
						onChange={(e) => {setTitle(e.target.value)}}
					/>
					
					{/* Available Dates */}
					<p className="text-2xl font-bold font-jura mt-10 mb-5">Available Dates:</p>
					<DatePicker selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>  
					
				</div>
				

				{/* Available Times */}
				<div className='right-col flex flex-col px-4 py-10 pb-20 items-center bg-white w-2/3 rounded-2xl ml-2'>
					<p className="text-2xl font-bold font-jura mb-10">Available Times:</p>
					<TimePicker selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes}/>
				</div>
			</div>


			{/* Submit */}
			<div className="flex mt-10 p-6 justify-center items-center">
			<button
				type="submit"
				disabled={isCreating}
				onClick={handleSubmit}
				className="items-center px-14 py-5 rounded-lg flex z-50 shadow-lg bg-[#E6EAEF]">
				<p>SUBMIT</p>
			</button> 
			{/* <Link href="/created">created page</Link> */}
			</div>
		</div>
	)
}

export default Home;