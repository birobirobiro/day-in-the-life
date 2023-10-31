import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideosBR from "@/components/YoutubeBRVideos";
import VideosShortsBR from "@/components/YoutubeShortsBR";
import VideosShortsWorld from "@/components/YoutubeShortsWorld";
import VideosWorld from "@/components/YoutubeWorldVideos";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col p-10 gap-10 justify-center items-center">
      <h1 className="text-3xl font-bold text-center ">
        A Day in the Life of a Software Engineer
      </h1>
      <Tabs defaultValue="videosBR">
        <TabsList>
          <TabsTrigger value="videosBR">Vídeos no Brasil</TabsTrigger>
          <TabsTrigger value="videosWorld">Vídeos em todo o Mundo</TabsTrigger>
          <TabsTrigger value="videosShortsBR">
            Youtube Shorts no Brasil
          </TabsTrigger>
          <TabsTrigger value="videosShortsWorld">
            Youtube Shorts em todo o Mundo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videosBR" className="mt-10">
          <VideosBR />
        </TabsContent>

        <TabsContent value="videosWorld" className="mt-10">
          <VideosWorld />
        </TabsContent>

        <TabsContent value="videosShortsBR" className="mt-10">
          <VideosShortsBR />
        </TabsContent>

        <TabsContent value="videosShortsWorld" className="mt-10">
          <VideosShortsWorld />
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
