// ref: https://www.youtube.com/watch?v=hwfiYvzH9s4
"use client";
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  return(

    <div className='w-full bg-[#E6EAEF] h-14 flex justify-center items-center '>
        <div className='text-xl font-bold flex items-center h-full'>
            <div className = "justify-center">
                MeetME
            </div>
        </div>
        
    </div>
  );
};

export default Navbar;