export default async function YoutubeWorld(pageToken = '') {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const maxResults = 18;
  const searchQuery = "day in the life of a software engineer";

  const fetchVideos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&maxResults=${maxResults}&q=${searchQuery}&order=date&type=video&videoDuration=medium&pageToken=${pageToken}&key=${apiKey}`
  );

  if (!fetchVideos.ok) {
    throw new Error(fetchVideos.statusText);
  }

  return fetchVideos.json();
}