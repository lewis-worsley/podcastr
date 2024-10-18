import { api } from '@/convex/_generated/api';
import { formatTime } from '@/lib/formatTime';
import { useAudio } from '@/providers/AudioProvider';
import { LatestPodcastCardProps } from '@/types';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LatestPodcast = ({ imgUrl, title, duration, views, audioUrl, index, podcastId, author }: LatestPodcastCardProps) => {
    const router = useRouter();
    const {setAudio} = useAudio();
    const updatePodcastViews = useMutation(api.podcasts.updatePodcastViews);

    const handleViews = () => {
        router.push(`/podcasts/${podcastId}`, {
            scroll: true
        });
    };

    const handlePlay = async () => {
        try {
            await updatePodcastViews({ podcastId });
        } catch (error) {
            console.error("Error updating podcast views", error);
        }

        setAudio({
            title,
            audioUrl: audioUrl || "",
            imageUrl: imgUrl,
            author: author,
            podcastId,
        });
    };

    return (
        <div className='cursor-pointer text-white-1'>
            <div className='flex flex-row items-center my-5 justify-between'>
                <div className='flex items-center gap-5'>
                    <Image 
                        src="/icons/play.svg"
                        width={24}
                        height={24}
                        alt='Play'
                        className='cursor-pointer hover:bg-orange-1'
                        onClick={handlePlay}
                    />
                    <figure className='flex gap-5 items-center' onClick={handleViews}>
                        <Image
                            src={imgUrl}
                            width={50}
                            height={50}
                            alt={title}
                            className='aspect-square h-fit w-full rounded-lg 2xl:size-[50px]'
                        />
                        <h2 className='text-16 truncate font-bold text-white-1'>{title}</h2>
                    </figure>
                </div>
                <div className='flex gap-20'>
                    <figure className='flex gap-3'>
                        <Image
                            src="/icons/headphone.svg"
                            width={24}
                            height={24}
                            alt='headphone'
                        />
                        <div className='text-16 font-bold text-white-1'>
                            {views}
                        </div>
                    </figure>
                    <figure className='flex gap-3'>
                        <Image
                            src="/icons/watch.svg"
                            width={24}
                            height={24}
                            alt='watch'
                        />
                        <div className='text-16 font-bold text-white-1'>
                            {formatTime(duration)}
                        </div>
                    </figure>
                    <Image 
                        src="/icons/three-dots.svg"
                        width={24}
                        height={24}
                        alt='three-dots'
                    />
                </div>
            </div>
            <div className='glassmorphism border-2 border-grayd-1'></div>
        </div>
    )
}

export default LatestPodcast