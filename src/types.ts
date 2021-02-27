export type Result = Track | Artist | Collection;

interface CommonResult {
  wrapperType: "track" | "collection" | "artist";
}

export interface Track extends CommonResult {
  trackId: string;
  artistName: string;
  trackName: string;
  artworkUrl60: string;
}

export interface Artist extends CommonResult {
  artistId: string;
  artistName: string;
  primaryGenreName: string;
}

export interface Collection extends CommonResult {
  collectionId: string;
  collectionName: string;
  artistName: string;
  artworkUrl60: string;
}

export interface FetchResultsRequest {
  searchTerm: string;
  filters: Filters;
}

export interface Filters {
  track: boolean;
  artist: boolean;
  collection: boolean;
}
