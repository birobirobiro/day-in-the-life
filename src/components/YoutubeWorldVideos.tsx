'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  useEffect,
  useState,
} from "react";
import YoutubeWorld from "@/app/api/youtubeWorld";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  nextPageToken?: string;
  prevPageToken?: string;
};

export default function VideosWorld() {
  const [worldVideos, setWorldVideos] = useState<VideoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPageToken, setCurrentPageToken] = useState('');
  const [prevPageToken, setPrevPageToken] = useState('');

  const fetchWorldVideos = async (pageToken = '') => {
    try {
      const data: VideoResponse = await YoutubeWorld(pageToken);
      setWorldVideos(data);
      setCurrentPageToken(data.nextPageToken || '');
      setPrevPageToken(data.prevPageToken || '');
    } catch (error) {
      console.error("Failed to fetch world videos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorldVideos();
  }, []);

  const handleNextPage = () => {
    if (currentPageToken) {
      setLoading(true);
      fetchWorldVideos(currentPageToken);
    }
  };

  const handlePreviousPage = () => {
    if (prevPageToken) {
      setLoading(true);
      fetchWorldVideos(prevPageToken);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!worldVideos) {
    return <div>No world videos found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {worldVideos.items.map((video) => (
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
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePreviousPage} />
          </PaginationItem>
          {/* You can add more PaginationLink items here if needed */}
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}