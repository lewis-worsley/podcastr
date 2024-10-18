"use client";

import LatestPodcast from '@/components/LatestPodcast';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const Home = () => {
	const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);
	const latestPodcasts = useQuery(api.podcasts.getAllPodcasts)?.slice(0, 4);

	if (!trendingPodcasts) return <LoaderSpinner />

	return (
		<div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
			<section className='flex flex-col gap-5'>
				<h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
				<div className="podcast_grid">
					{trendingPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
						<PodcastCard
							key={_id}
							imgUrl={imageUrl as string}
							title={podcastTitle}
							description={podcastDescription}
							podcastId={_id}
						/>
					))}
				</div>
			</section>
			<section className='flex flex-col gap-5'>
				<div className='flex items-baseline justify-between'>
					<h2 className="text-18 font-bold text-white-1">Latest Podcasts</h2>
					<p className='text-orange-1 text-16 font-semibold'>See all</p>
				</div>
				<div>
					{latestPodcasts?.map(({ _id, podcastTitle, imageUrl, audioDuration, views, audioUrl, author }, index) => (
						<LatestPodcast
							key={_id}
							imgUrl={imageUrl as string}
							title={podcastTitle}
							duration={audioDuration}
							views={views}
							audioUrl={audioUrl as string}
							podcastId={_id}
							author={author}
							index={index}
						/>
					))}
				</div>
			</section>
		</div>
	)
}

export default Home