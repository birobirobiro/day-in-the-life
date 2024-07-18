export default async function YoutubeShortsWorld(pageToken = '') {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const maxResults = 20;
  const searchQuery = "in the Life of a Software Engineer";

  const fetchVideos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=${maxResults}&q=${searchQuery}&order=date&type=video&videoDuration=short&pageToken=${pageToken}&key=${apiKey}`
  );

  if (!fetchVideos.ok) {
    throw new Error(fetchVideos.statusText);
  }

  return fetchVideos.json();
}