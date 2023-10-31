export default async function YoutubeWorld() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const maxResults = 20;
  const searchQuery = "a day in the life of a software engineer";

  const fetchVideos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchQuery}&order=date&type=video&videoDuration=medium&key=${apiKey}`
  );

  if (!fetchVideos.ok) {
    throw new Error(fetchVideos.statusText);
  }

  return fetchVideos.json();
}
