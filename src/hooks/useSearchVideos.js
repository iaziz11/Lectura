import { useQuery } from "@tanstack/react-query";

const API_URL = "https://rvpdgz6nk7.execute-api.us-east-2.amazonaws.com/search";
export function useSearchVideos(query) {
  return useQuery({
    queryKey: ["videos", query],
    queryFn: async () => {
      const url = query
        ? `${API_URL}?q=${encodeURIComponent(query)}&type=video`
        : `${API_URL}?type=video`;

      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      console.log(data);
      const ret = data.map((item) => ({
        itemName: item.itemName["S"],
        className: item.className["S"],
        uploadDate: item.dateUploaded["S"],
        processed: item.isVideoProcessed["BOOL"],
      }));
      if (!res.ok) throw new Error("Failed to fetch videos");
      return ret;
    },
    staleTime: 1000 * 60, // 1 minute caching
  });
}
