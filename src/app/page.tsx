import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YoutubeWorld from "./api/youtubeWorld";
import YoutubeBR from "./api/youtubeBR";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const worldVideos = await YoutubeWorld();
  const brVideos = await YoutubeBR();
  return (
    <main className="w-full flex flex-col p-10 gap-10">
      <h1 className="text-3xl font-bold text-center">
        A Day in the Life of a Software Engineer
      </h1>
      <Tabs defaultValue="videosBR">
        <TabsList>
          <TabsTrigger value="videosBR">Vídeos no Brasil</TabsTrigger>
          <TabsTrigger value="videosWorld">Vídeos em todo o Mundo</TabsTrigger>
        </TabsList>

        <TabsContent value="videosWorld" className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {worldVideos.items.map((video) => (
              <Card key={video.id}>
                <CardHeader>
                  <CardTitle className="leading-relaxed">
                    {video.snippet.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe
                    className="w-full rounded-lg"
                    height="315"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  ></iframe>

                  <div className="flex gap-2 pt-4">
                    <Badge variant="secondary">
                      {video.snippet.channelTitle}
                    </Badge>
                    <Badge variant="secondary">
                      {new Date(video.snippet.publishTime).toLocaleDateString(
                        "pt-BR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <CardDescription className="flex flex-col gap-2 mb-2">
                    <span className="leading-relaxed">
                      {video.snippet.description}
                    </span>
                  </CardDescription>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videosBR" className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {brVideos.items.map((video) => (
              <Card key={video.id}>
                <CardHeader>
                  <CardTitle className="leading-relaxed">
                    {video.snippet.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe
                    className="w-full rounded-lg"
                    height="315"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  ></iframe>

                  <div className="flex gap-2 pt-4">
                    <Badge variant="secondary">
                      {video.snippet.channelTitle}
                    </Badge>
                    <Badge variant="secondary">
                      {new Date(video.snippet.publishTime).toLocaleDateString(
                        "pt-BR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <CardDescription className="flex flex-col gap-2 mb-2">
                    <span className="leading-relaxed">
                      {video.snippet.description}
                    </span>
                  </CardDescription>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <footer className="flex justify-center align-center text-slate-400">
        <Link
          href="https://birobirobiro.dev"
          target="_blank"
          className="underline text-center"
        >
          birobirobiro.dev
        </Link>
      </footer>
    </main>
  );
}
