import { Metadata } from "next";
import App from "~/app/app";

const appUrl = process.env.NEXT_PUBLIC_URL;

interface Props {
  params: Promise<{
    tableid: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tableid } = await params;

  const frame = {
    version: "next",
    imageUrl: `${appUrl}/frames/hello/${tableid}/opengraph-image`,
    button: {
      title: "Launch Frame",
      action: {
        type: "launch_frame",
        name: "Farcaster Frames v2 Demo",
        url: `${appUrl}/frames/hello/${tableid}/`,
        splashImageUrl: `${appUrl}/splash.png`,
        splashBackgroundColor: "#f7f7f7",
      },
    },
  };

  return {
    title: `Hello, ${tableid}`,
    description: `A personalized hello frame for ${tableid}`,
    openGraph: {
      title: `Hello, ${tableid}`,
      description: `A personalized hello frame for ${tableid}`,
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default async function HelloNameFrame({ params }: Props) {
  const { tableid } = await params;

  return <App title={`Now watching @ table ${tableid}`} />;
}
