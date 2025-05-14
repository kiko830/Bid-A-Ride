import { useParamsStore } from '@/hooks/useParamsStore';
import {Button, ButtonGroup} from "flowbite-react";
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFlame, GiFinishLine } from 'react-icons/gi';

const pageSizeButtons = [4, 8, 12];

const orderButtons = [
    {
        label: 'Alphabetical',
        icon: AiOutlineSortAscending,
        value: 'make'
    },
    {
        label: 'Ending soon',
        icon: AiOutlineClockCircle,
        value: 'endingSoon'
    },
    {
        label: 'Recently added',
        icon: BsFillStopCircleFill,
        value: 'new'
    },
]

const filterButtons = [
    {
        label: 'Live auctions',
        icon: GiFlame,
        value: 'live'
    },
    {
        label: 'Ending < 6 hours',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value: 'finished'
    }
]

export default function Filters() { 
    const pageSize = useParamsStore(state => state.pageSize);
    const setParams = useParamsStore(state => state.setParams);
    const orderBy = useParamsStore(state => state.orderBy);
    const filterBy = useParamsStore(state => state.filterBy);

    return (
        <div className='flex flex-col gap-4 xl:flex-row xl:justify-between xl:items-center mb-4'>
             <div className='flex md:items-center  '>
                <span className='uppercase text-sm text-gray-500 mr-2'>Filter by</span>
                <ButtonGroup outline className='max-sm:flex max-sm:flex-col '>
                    {filterButtons.map(({label, icon: Icon, value }) => (
                        <Button key={value} 
                            onClick={() => setParams({filterBy: value})}
                            color={`${filterBy === value ? 'red' : 'gray'}`}
                             className='focus:ring-0 max-sm:rounded-lg max-sm:border'
                        >
                            <Icon className='mr-3 h-4 w-4'/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className='flex md:items-center'>
                <span className='uppercase text-sm text-gray-500 mr-2'>Order by</span>
                <ButtonGroup outline className='max-sm:flex max-sm:flex-col '>
                    {orderButtons.map(({label, icon: Icon, value}) => (
                        <Button
                            key={value}
                            onClick={() => setParams({orderBy: value})}
                            color={`${orderBy === value ? 'red' : 'gray'}`}
                            className='focus:ring-0 max-sm:rounded-lg max-sm:border'>
                            <Icon className='mr-3 h-4 w-4'/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className='flex md:items-center'>
                <span className='uppercase text-sm text-gray-500 mr-2'>Page Size</span>
                <ButtonGroup outline>
                    {pageSizeButtons.map((value, i) => (
                        <Button key={i} onClick={() =>
                                setParams({pageSize: value})}
                                color={`${pageSize === value ? 'red' : 'gray'}`}
                                className='focus:ring-0'
                        >
                            {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
}