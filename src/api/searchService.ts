import { FetchResultsRequest } from "../types";

export const fetchSearchResults = (
  request: FetchResultsRequest,
  offset: number
) => {
  const { searchTerm, filters } = request;
  const { artist, collection, track } = filters;

  let entity;
  if (!artist && !collection && !track) {
    entity = `musicArtist,album,song`;
  } else {
    entity = `${artist ? "musicArtist" : ""},${collection ? "album" : ""},${
      track ? "song" : ""
    }`;
  }

  const url = `http://localhost:8080/search?term=${searchTerm}&entity=${entity}&offset=${offset}`;

  const response = fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch(e => {
      throw e;
    });

  return response;
};
