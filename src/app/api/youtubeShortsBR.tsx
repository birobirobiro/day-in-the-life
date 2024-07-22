export default async function YoutubeShortsBR(pageToken = '') {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const maxResults = 20;
  const searchQuery = "um dia na vida de um programador|rotina de programador";

  const fetchVideos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=${maxResults}&q=${encodeURIComponent(searchQuery)}&order=date&type=video&videoDuration=short&pageToken=${pageToken}&key=${apiKey}&relevanceLanguage=pt`
  );

  if (!fetchVideos.ok) {
    throw new Error(fetchVideos.statusText);
  }

  return fetchVideos.json();
}
