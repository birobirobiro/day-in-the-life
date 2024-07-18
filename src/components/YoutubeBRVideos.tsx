'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  useEffect,
  useState,
} from 'react';
import YoutubeBR from '@/app/api/youtubeBR';

type Video = {
  id: { videoId: string } | null | undefined;
  snippet: {
    title:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | PromiseLikeOfReactNode
      | null
      | undefined;
    channelTitle:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | PromiseLikeOfReactNode
      | null
      | undefined;
    publishTime: string | number | Date;
    description:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | PromiseLikeOfReactNode
      | null
      | undefined;
  };
};

type VideoResponse = {
  items: Video[];
};

export default function VideosBR() {
  const [brVideos, setBrVideos] = useState<VideoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data: VideoResponse = await YoutubeBR();
        setBrVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!brVideos) {
    return <div>No videos found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4">
      {brVideos.items.map((video) => (
        <Card key={video.id?.videoId}>
          <CardHeader>
            <CardTitle className="leading-relaxed truncate">
              {video.snippet.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              className="w-full rounded-lg"
              height="315"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              src={`https://www.youtube.com/embed/${video.id?.videoId}`}
            ></iframe>

            <div className="flex gap-2 pt-4">
              <Badge variant="secondary" className="text-center">
                {video.snippet.channelTitle}
              </Badge>
              <Badge variant="secondary" className="text-center">
                {new Date(video.snippet.publishTime).toLocaleDateString(
                  'pt-BR',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
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
  );
}