"use client";
import React, { useState, useEffect } from 'react';


const DatePicker = (props) => {

    // const selectedDates = props.selectedDates;
    // const setSelectedDates = props.setSelectedDates;

    const daysCode = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthCode = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const realDate = new Date().getDate();  // 23
    const realMonth = new Date().getMonth() + 1; // 8

    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
    // const [realDate, setCurrDate] = useState(new Date().getDate());

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


    function CalendarMonthView({year, month, selectedDates, setSelectedDates}) {
        // console.log(selectedDates);
        // selectedDates.push('test2');

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
        

        function selectDates(day) {
            if(hasSelectedDate(day)){
                setSelectedDates(selectedDates.filter(selectedDate => selectedDate[1] !== day));
            } else {
                setSelectedDates([...selectedDates, [currMonth, day]]);
            }
            
        }

        // check if the date been selected
        function hasSelectedDate(day) {
            let selected = false;
            selectedDates.map((d, didx) => {
                if(d[0] === currMonth && d[1] === day){
                    selected = true;
                }
            })
            if(selected){
                return true;
            } else {
                return false;
            }
        }

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
                            ((day >= realDate && currMonth === realMonth) || currMonth > realMonth) ?
                                ((hasSelectedDate(day)) ? 
                                    <div day={dayidx} className='calendar-date text-center border border-[#809BBF] cursor-pointer rounded-md bg-[#809BBF]' onClick={() => selectDates(day)}>{day !== null ? day : ''}</div>
                                : <div day={dayidx} className='calendar-date text-center border border-[#809BBF] cursor-pointer rounded-md hover:bg-[#E6EAEF]' onClick={() => selectDates(day)}>{day !== null ? day : ''}</div>)
                            : <div day={dayidx} className='calendar-date text-center text-[#BFC3C8] border border-[#809BBF] rounded-md'>{day !== null ? day : ''}</div>
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
            <CalendarMonthView year={currYear} month={currMonth} selectedDates={props.selectedDates} setSelectedDates={props.setSelectedDates}/>
   
        </div>
    </>
    );
};

export default DatePicker;