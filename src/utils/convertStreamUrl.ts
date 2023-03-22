const convertStreamUrl = (streamUrl: string, is320Kbps?: boolean): string => {
  if (is320Kbps === undefined) is320Kbps = false;

  let newStreamUrl = streamUrl.replace(
    "preview.saavncdn.com",
    "jiosaavn.cdn.jio.com"
  );

  if (is320Kbps) newStreamUrl = newStreamUrl.replace("96_p.mp4", "320.mp4");
  else newStreamUrl = newStreamUrl.replace("96_p.mp4", "160.mp4");

  return newStreamUrl;
};

export default convertStreamUrl;
