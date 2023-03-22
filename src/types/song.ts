type Song = {
  type: "song";
  id: string;

  title: string;
  description: string;
  year?: string;

  album: string;

  image: string;

  durationSeconds?: number;
  durationString?: string;

  streamUrl?: string;
};

export default Song;
