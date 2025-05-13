import { getDetailedViewData, getBidsForAuction } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import React from "react";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import DetailedSpecs from "./DetailedSpecs";
import { getCurrentUser } from "@/app/actions/authActions";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import BidItem from "./BidItem";
import BidList from "./BidList";

export default async function Details({ params }: { params: { id: string } }) {
   const { id } = await params
  const data = await getDetailedViewData(id);
  const user = await getCurrentUser();

  return (
    <div>
      <div className="lg:flex lg:justify-between">
        <div className="lg:flex lg:justify-between w-1/2">
          <Heading title={`${data.make} ${data.model}`} />
          {user?.username === data.seller && 
          <div className="flex gap-3">
          <EditButton id={data.id} />
          <DeleteButton id={data.id} />
          </div>}
        </div>
        <div className="flex gap-3 mt-2">
          <h3 className="text-2xl font-semibold">Time remaining</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mt-3 ">
        <div className="w-full bg-gray-200 relative aspect-[4/3] rounded-lg overflow-hidden">
          <CarImage imageUrl={data.imageUrl} />
        </div>

        <BidList user = {user} auction = {data} />
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data} />
      </div>
    </div>
  );
}
