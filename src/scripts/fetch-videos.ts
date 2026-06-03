const CHANNEL_ID = 'UCrXDJRi5HCbT9sMJr20vZNA';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

type VideoItem = {
	guid: string;
	title: string;
	pubDate: string;
	link: string;
	thumbnail: string;
};

type RSSResponse = {
	status: string;
	items: Array<{
		guid: string;
		title: string;
		pubDate: string;
		link: string;
		thumbnail?: string;
	}>;
};

const dateFmt = new Intl.DateTimeFormat('th-TH', {
	day: 'numeric',
	month: 'short',
	year: 'numeric'
});

function extractVideoId(guid: string): string {
	return guid.replace('yt:video:', '');
}

async function fetchLatestVideos(): Promise<VideoItem[]> {
	try {
		const res = await fetch(API_URL);
		if (!res.ok) return [];
		const data: RSSResponse = await res.json();
		if (data.status !== 'ok') return [];

		return data.items.slice(0, 3).map((item) => {
			const videoId = extractVideoId(item.guid);
			return {
				guid: item.guid,
				title: item.title,
				pubDate: item.pubDate,
				link: item.link,
				thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
			};
		});
	} catch (err) {
		console.error('Failed to fetch YouTube videos:', err);
		return [];
	}
}

function updateFeaturedVideo(video: VideoItem) {
	const tile = document.querySelector('.video-tile');
	if (!tile) return;

	const img = tile.querySelector('img');
	const title = tile.querySelector('.video-caption strong');
	const link = tile as HTMLAnchorElement;

	if (img) img.src = video.thumbnail;
	if (img) img.alt = video.title;
	if (title) title.textContent = video.title;
	if (link) link.href = video.link;
}

function updateMoreVideos(videos: VideoItem[]) {
	const list = document.querySelector('.video-more');
	if (!list || videos.length === 0) return;

	list.removeAttribute('data-empty');
	list.innerHTML = videos
		.map(
			(video) => `
		<li>
			<a href="${video.link}" target="_blank" rel="noopener noreferrer">
				<span class="video-more-date">${dateFmt.format(new Date(video.pubDate))}</span>
				<span class="video-more-title">${video.title}</span>
			</a>
		</li>
	`
		)
		.join('');
}

async function init() {
	const videos = await fetchLatestVideos();
	if (videos.length === 0) return; // keep SSR fallback

	const [featured, ...more] = videos;
	updateFeaturedVideo(featured);
	updateMoreVideos(more);
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
