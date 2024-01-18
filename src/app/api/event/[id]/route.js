import connectDB from "@/app/lib/mongodb";
import Event from "@/app/models/event";
import { NextResponse } from "next/server";
// import { useRouter } from "next/router";

// 更新指定id的event
export async function PUT(req, {params}) {
    const { result, desc } = await req.json();
    console.log("result: ", result);

    const {id} = params;
    console.log("id: ", id);

    try{

        await connectDB();
        
        const updatedEvent = await Event.findByIdAndUpdate(id, {
            desc: desc,
            result: result,
        }, {new: true});
        
        if(!updatedEvent) {
            return NextResponse.json({
                message: "Event not found.",
                success: false,
            }, {status: 404});
        }
        
        return NextResponse.json({
            message: "Event updated successfully.",
            success: true,
            event: updatedEvent,
        }, {status: 200});

    } catch(error) {
        return NextResponse.json({
            message: "Unable to update event.",
            success: false,
        }, {status: 500});
    
    }
}

// 得到指定id的event
export async function GET(req, {params}) {
    const {id} = params;
    await connectDB();
    const event = await Event.findOne({_id: id});
    return NextResponse.json({event}, {status: 200});

}