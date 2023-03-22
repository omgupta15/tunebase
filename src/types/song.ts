type Song = {
  type: "song";
  id: string;
  title: string;
  album: string;
  image: string;
  description: string;
  streamUrl?: string;
};

export default Song;
