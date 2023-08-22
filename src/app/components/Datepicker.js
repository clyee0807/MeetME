"use client";
import React, { useState, useEffect } from 'react';


const DatePicker = () => {

    const daysCode = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthCode = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
    const [currDate, setCurrDate] = useState(new Date().getDate());

    const [currTitle, setCurrTitle] = useState(getCalendarTitle(currMonth, currYear));

    useEffect(() => { // 當currMonth, currYear的值改變時會呼叫
        setCurrTitle(getCalendarTitle(currMonth, currYear));
    }, [currMonth, currYear]);

    function nextMonth() {
        if (currMonth === 12) {
            setCurrYear(currYear + 1);
            setCurrMonth(1);
            return;
        }
        setCurrMonth(currMonth + 1);
    }

    function prevMonth() {
        if (currMonth === 1) {
            setCurrYear(currYear - 1);
            setCurrMonth(12);
            return;
        }
        setCurrMonth(currMonth - 1);
    }

    function getCalendarTitle(month, year) {
        return monthCode[month] + " " + year.toString();
    }

    // console.log(currTitle);

    function CalendarMonthView({year, month}) {

        // const daysInMonth = new Date(2023, 8, 0).getDate();  // 31 days in Aug
        // const firstDayOfWeek = new Date(2023, 8 - 1, 1).getDay(); // 0 for Sunday, 1 for Monday...
        const daysInMonth = new Date(year, month, 0).getDate();  // 31 days in Aug
        const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 for Sunday, 1 for Monday...

        const calendarMatrix = [];
        let currWeek = [];

        // first row
        for(let i=0; i<firstDayOfWeek; i++) {
            currWeek.push(null);
        }

        for(let i=1; i<=daysInMonth; i++){
            currWeek.push(i);
            if(currWeek.length === 7){
                calendarMatrix.push(currWeek);
                currWeek = [];
            }
        }

        // last row
        while (currWeek.length < 7 && currWeek.length !== 0) {
            currWeek.push(null);
        }
        calendarMatrix.push(currWeek);
        

        console.log(firstDayOfWeek);
        console.log(daysInMonth);
        console.log(calendarMatrix);

        return(
        <div className='calendar-view flex flex-col'>
            <div className='calendar-days flex flex-row'>
                {daysCode.map(day => (  // weekdays
                    <div key={day} className='calendar-eachday mx-2'>{day}</div>
                    ))}
            </div>
            <div className='calendar-dates'>
                {calendarMatrix.map((week, weekidx) => (
                    <div key={weekidx} className='grid grid-cols-7 gap-1 my-1'>
                        {week.map((day, dayidx) => (
                            <div day={dayidx} className=
                                'calendar-date text-center border border-[#809BBF] cursor-pointer rounded-md hover:bg-[#E6EAEF]'
                            >{day !== null ? day : ''}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        );
    }

    return(
    <>

        <div className='justify-center items-center px-8  py-5 my-10 bg-white rounded-lg'>
            <div className="calendar-title flex flex-row justify-center items-center">
                <p onClick={prevMonth} className="select-none cursor-pointer">{'<'}</p>
                <p className='mx-10'>{currTitle}</p>
                <p onClick={nextMonth} className="select-none cursor-pointer">{'>'}</p>
            </div>
            <CalendarMonthView year={currYear} month={currMonth}/>
   
        </div>
    </>
    );
};

export default DatePicker;