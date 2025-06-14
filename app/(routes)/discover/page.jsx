"use client"
import { SEARCH_RESULT } from '@/services/Shared';
import axios from 'axios';
import { Cpu, DollarSign, Globe, Palette, Star, Tv, Volleyball } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import NewsCard from './_components/NewsCard';

const options = [
    {
        title: 'Top',
        icon: Star
    },
    {
        title: 'Tech & Science',
        icon: Cpu
    },
    {
        title: 'Finance',
        icon: DollarSign
    },
    {
        title: 'Art & Culture',
        icon: Palette
    },
    {
        title: 'Sports',
        icon: Volleyball
    },
    // {
    //     title: 'Entertainment',
    //     icon: Tv
    // },
]

function Discover() {

    const [selectedOption, setSelectedOption] = useState('Top');
    const [latestNews, setLatestNews] = useState();
    useEffect(() => {
        selectedOption && GetSearchResult();
    }, [selectedOption])

    const GetSearchResult = async () => {
        const result = await axios.post('/api/brave-search-api', {
            searchInput: selectedOption + ' Latest News & Updates',
            searchType: 'Search'
        })
        console.log(result.data);
        const webSearchResult = result?.data?.web?.results;
        setLatestNews(webSearchResult);
    }

    return (
        <div className='mt-20 px-10 md:px-20 lg:px-36 xl:px-56 '>
            <h2 className='font-bold text-3xl flex gap-2 items-center'> <Globe /> <span>Discover</span></h2>
            <div className='flex mt-5'>
                {options.map((option, index) => (
                    <div key={index}
                        onClick={() => setSelectedOption(option.title)}
                        className={`flex gap-1 p-1 px-3 hover:text-primary items-center rounded-full
                    cursor-pointer ${selectedOption == option.title && 'bg-accent text-primary'}`}>
                        <option.icon className='h-4 w-4' />
                        <h2 className='text-sm'>{option.title}</h2>
                    </div>
                ))}
            </div>

            <div className="w-full">
                {latestNews?.map((news, index) => {
                    const isFullWidth = index % 4 === 0;

                    if (isFullWidth) {
                        // Full width card
                        return (
                            <div key={index} className="w-full mb-4">
                                <NewsCard news={news} />
                            </div>
                        );
                    }

                    // Group next 3 cards into a grid
                    const group = latestNews.slice(index, index + 3);

                    if (index % 4 === 1) {
                        return (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                {group.map((item, i) => (
                                    <NewsCard news={item} key={index + i} />
                                ))}
                            </div>
                        );
                    }

                    return null; // skip rendering from index 2 and 3 directly; they're rendered in the group above
                })}
            </div>

        </div>
    )
}

export default Discover