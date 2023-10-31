export default async function YoutubeBR() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const maxResults = 20;
  const searchQuery = "rotina programador";

  const fetchVideos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchQuery}&order=date&type=video&videoDuration=medium&key=${apiKey}`
  );

  if (!fetchVideos.ok) {
    console.log(fetchVideos);
    throw new Error(fetchVideos.statusText);
  }

  return fetchVideos.json();
}
