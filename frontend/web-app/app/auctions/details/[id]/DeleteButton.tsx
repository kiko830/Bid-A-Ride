"use client";
import { Button, Spinner } from "flowbite-react";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteAuction } from "@/app/actions/auctionActions";
import toast from "react-hot-toast";

type Props = {
    id: string;
}
export default function DeleteButton({id}: Props) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  function doDelete() {
    setLoading(true);
    deleteAuction(id).then ((res) =>{
        if(res.error) throw res.error;
        router.push('/');
    }).catch(error => {
        toast.error(error.status + ' ' + error.message);
    }).finally(() => setLoading(false))
  }
  return (
    <Button disabled={loading} onClick={doDelete} outline>
      {loading ? (
        <>
          <Spinner size="sm" light className="mr-2" />
          Processing...
        </>
      ) : (
        "Delete Auction"
      )}
    </Button>
  );
}
