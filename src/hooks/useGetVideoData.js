import { useQuery } from "@tanstack/react-query";

const API_URL = "https://rvpdgz6nk7.execute-api.us-east-2.amazonaws.com/search";
export function useGetVideoData(name) {
  return useQuery({
    queryKey: ["video", name],
    queryFn: async () => {
      try {
        const url = `${API_URL}?q=${encodeURIComponent(name)}`;

        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        const ret = {};
        console.log(data);
        for (const key of data) {
          if (key.itemType.S === "video") {
            ret.itemName = key.itemName.S;
            ret.videoUrl = key.s3Url.S;
            ret.uploadDate = key.dateUploaded.S;
            ret.className = key.className.S;
          } else if (key.itemType.S === "transcript") {
            ret.transcript = key.transcriptText.results.audio_segments;
            console.log(ret.transcript);
          } else if (key.itemType.S === "summary") {
            ret.summaryText = JSON.parse(key.itemText.S).summary;
          } else {
            ret.quiz = JSON.parse(key.itemText.S).quiz;
          }
        }
        console.log(ret);
        if (!res.ok) throw new Error("Failed to fetch videos");
        return ret;
      } catch (error) {
        console.error("Error fetching video data:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1 minute caching
  });
}
