'use client'

import { TextInput, Button } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm, FieldValues } from 'react-hook-form';
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { createAuction, updateAuction } from '../actions/auctionActions';
import toast from 'react-hot-toast';
import { Auction } from '@/types';
import Link from 'next/link';

type Props = {
    auction?: Auction
}

export default function AuctionForm({ auction }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { control, handleSubmit, setFocus, reset, formState: { isSubmitting, isValid } } = useForm({
        mode: 'onTouched'
    });

    useEffect(() => {
        if (auction) {
            const { make, model, color, mileage, year } = auction;
            reset({ make, model, color, mileage, year })
        }
        setFocus('make');
    }, [setFocus])

    async function onSubmit(data: FieldValues) {
        data.reservePrice == '' ? data.reservePrice = 0 : data.reservePrice;
        console.log('data', data);
        try {
            let id = '';
            let res;
            if (pathname === '/auctions/create') {
                res = await createAuction(data);
                id = res.id;
            } else {
                if (auction) {
                    res = await updateAuction( auction.id,data);
                    id = auction.id;
                }
            }

            if (res.error) {
                throw res.error;
            }
            router.push(`/auctions/details/${id}`)
        } catch (error: any) {
            console.log(error);
            toast.error(error.status + ' ' + error.message)
        }
    }

    return (
        <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
            <Input label='Make' name='make' control={control} rules={{ required: 'Make is required' }} />
            <Input label='Model' name='model' control={control} rules={{ required: 'Model is required' }} />
            <Input label='Color' name='color' control={control} rules={{ required: 'Color is required' }} />
            <div className="grid grid-cols-2 gap-3">
                <Input label='Year' name='year' type='number' control={control} rules={{ required: 'Year is required' }} />
                <Input label='Mileage' name='mileage' type='number' control={control} rules={{ required: 'Mileage is required' }} />
            </div>
            {pathname === '/auctions/create' && 
            <>
                <Input label='Image URL' name='imageUrl' control={control} rules={{ required: 'Image url is required' }} />
                <div className="grid md:grid-cols-2 md:gap-3 text-wrap">
                    <Input label='Reserve price (leave blank for no reserve)' name='reservePrice' type='number' control={control} />
                    <DateInput
                        label='Auction end date/time'
                        name='auctionEnd'
                        dateFormat='dd MMMM yyyy h:mm a'
                        showTimeSelect
                        control={control}
                        rules={{ required: 'Auction end date is required' }}
                    />
                </div>
            </>}


            <div className="flex justify-between">
                <Button outline color='gray'>
                    <Link href='/'>
                        Cancel
                    </Link>
                </Button>
                <Button
                    disabled={!isValid}
                    outline
                    color='green'
                    type="submit">Submit</Button>
            </div>
        </form>
    )
}