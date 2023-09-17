import connectDB from "@/app/lib/mongodb";
import Event from "@/app/models/event";
import { NextResponse } from "next/server";

// 更新指定id的event
export async function PUT(req, {params}) {
    const {id} = params;
    const { newTitle: title, newAvailableDates: availableDates, newAvailableTimes: availableTimes} = await req.json();

    await connectDB();
    await Event.findByIdAndUpdate(id, {title, availableDates, availableTimes});
    return NextResponse.json({message: "Event updated."}, {status: 200});
}

// 得到指定id的event
export async function GET(req, {params}) {
    const {id} = params;
    await connectDB();
    const event = await Event.findOne({_id: id});
    return NextResponse.json({event}, {status: 200});

}