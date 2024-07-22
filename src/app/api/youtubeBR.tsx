export default async function YoutubeBR(pageToken = '') {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const maxResults = 18;
  const searchQuery = "um dia na vida de um programador|rotina de programador";

  const fetchVideos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=${maxResults}&q=${encodeURIComponent(searchQuery)}&order=date&type=video&videoDuration=medium&pageToken=${pageToken}&key=${apiKey}&relevanceLanguage=pt`
  );

  if (!fetchVideos.ok) {
    console.log(fetchVideos);
    throw new Error(fetchVideos.statusText);
  }

  return fetchVideos.json();
}
