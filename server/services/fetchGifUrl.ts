import axios from 'axios';

interface GiphyApiResponse {
  data: Array<{
    images: {
      downsized_medium: {
        url: string;
      };
    };
  }>;
}

async function fetchGifUrl(keyword: string): Promise<string> {
  console.log("Fetching GIF for keyword:", keyword);
  const APIKEY = process.env.VITE_GIPHY_API;
  let gifUrl = "";

  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
    const data = response.data as GiphyApiResponse;
    gifUrl = data.data[0]?.images?.downsized_medium.url;
  } catch (error) {
    console.error(error);
    gifUrl = "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284";
  }

  console.log("GIF URL fetched:", gifUrl);
  return gifUrl;
}

export default fetchGifUrl;


