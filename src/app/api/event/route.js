import connectDB from "@/app/lib/mongodb";
import Event from "@/app/models/event";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// 新增一個event
export async function POST(req) {
    const {result, desc} = await req.json();
    console.log("result: ", result);
    console.log("desc: ", desc);
    
    try {
        await connectDB();
        console.log("Database connected!");
    } catch (error) {
        console.log("Failed to connect to database.");
    }

    try {

        const newEvent = await Event.create({result, desc});

        return NextResponse.json({
            msg: ["Message sent successfully"], 
            success: true,
            _id: newEvent._id,
        });
    } catch(error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for(let e in error.errors) {
                errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({msg: errorList});
        } else {
            return NextResponse.json({msg: ["Unable to send message."]});
        }
    }
}

// return所有event
export async function GET() {
    await connectDB();
    const events = await Event.find();
    return NextResponse.json({events});
}


export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectDB();
    await Event.findByIdAndDelete(id);
    return NextResponse.json({message: "Event deleted."}, {status: 200});
}
