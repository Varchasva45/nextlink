import Event from "@/models/Event";
import mongoose from "mongoose";

export async function POST(req) { 
  const url = new URL(req.url);
  const uri = atob(url.searchParams.get("url"));
  const page = url.searchParams.get("page"); 
  await mongoose.connect(process.env.MONGO_URI);
  Event.create({type:"Click", uri:uri, page:page});
  return Response.json(true);
}