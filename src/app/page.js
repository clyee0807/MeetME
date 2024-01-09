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
				console.log("data from route.js: ", data);
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
		<div className="">
			{/* Event Name */}
			<div className='flex flex-col justify-center items-center'>
			<p className="text-2xl font-bold mb-2 mt-10">Event Name:</p>
			<input 
				className="border rounded p-1 h-8" 
				type="text"
				value={title}
				onChange={(e) => {setTitle(e.target.value)}}
				/>
			</div>

			{/* Available Dates */}
			<div className='flex flex-col justify-center items-center mt-10'>
			<p className="text-2xl font-bold">Available Dates:</p>
			<DatePicker selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>  
			</div>
			

			{/* Available Times */}
			<div className='flex flex-col justify-center items-center mt-10'>
			<p className="text-2xl font-bold">Available Times:</p>
			<TimePicker selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes}/>
			</div>

			{/* Submit */}
			<div className="flex p-6 justify-center items-center">
			<button
				type="submit"
				disabled={isCreating}
				onClick={handleSubmit}
				className="items-center px-4 py-2 rounded-lg flex z-50 shadow-lg">
				<p>SUBMIT</p>
			</button> 
			{/* <Link href="/created">created page</Link> */}
			</div>
		</div>
	)
}

export default Home;