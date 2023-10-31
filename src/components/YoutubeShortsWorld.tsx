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
} from "react";
import YoutubeShortsWorld from "@/app/api/youtubeShortsWorld";

export default async function VideosShortsWorld() {
  const shortVideosWorld = await YoutubeShortsWorld();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {shortVideosWorld.items.map(
        (video: {
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
        }) => (
          <Card key={video.id?.videoId}>
            <CardHeader>
              <CardTitle className="leading-relaxed truncate">
                {video.snippet.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                className="w-full rounded-lg"
                height="500"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                src={`https://www.youtube.com/embed/${video.id?.videoId}`}
              ></iframe>

              <div className="flex gap-2 pt-4">
                <Badge variant="secondary">{video.snippet.channelTitle}</Badge>
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
        )
      )}
    </div>
  );
}
