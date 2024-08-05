import Image from 'next/image'
import React from 'react'

const PodcastCard = ({title, description, imgURL, podcastId}: {
    title: string,
    description: string,
    imgURL: string,
    podcastId: number,
}) => {
    return (
        <div className='cursor-pointer'>
            <figure className='flex flex-col gap-2'>
                <Image 
                    src={imgURL}
                    width={174}
                    height={174}
                    alt={title}
                />
            </figure>
        </div>
    )
}

export default PodcastCard