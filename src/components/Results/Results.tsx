import React from "react";
import List from "@material-ui/core/List";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import FaceIcon from "@material-ui/icons/Face";
import { Result, Track, Artist, Collection } from "../../types";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchResults } from "../../appSlice";
import InifiniteScroll from "../InifiniteScroll/InifiniteScroll";
import ResultItem from "./ResultItem";

interface ResultsProps {
  data: Result[];
}

const mapTrack = ({ trackId, trackName, artistName, artworkUrl60 }: Track) => ({
  id: trackId,
  icon: <LibraryMusicIcon fontSize="large" />,
  text: `${trackName} - ${artistName}`,
  imageUrl: artworkUrl60
});

const mapArtist = ({ artistId, artistName }: Artist) => ({
  id: artistId,
  icon: <FaceIcon fontSize="large" />,
  text: `${artistName}`
});

const mapCollection = ({
  collectionId,
  collectionName,
  artworkUrl60
}: Collection) => ({
  id: collectionId,
  icon: <LibraryMusicIcon fontSize="large" />,
  text: `${collectionName}`,
  imageUrl: artworkUrl60
});

const mapResult = (result: Result) => {
  switch (result.wrapperType) {
    case "track":
      return mapTrack(result as Track);
    case "artist":
      return mapArtist(result as Artist);
    case "collection":
      return mapCollection(result as Collection);
  }
};

const Results: React.FunctionComponent<ResultsProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(state => state.app.searchTerm);
  const filters = useAppSelector(state => state.app.filters);
  const searchStatus = useAppSelector(state => state.app.status);
  const isLoading = searchStatus === "loading";

  const getSearchResults = () => {
    dispatch(fetchResults({ searchTerm, filters }));
  };

  return (
    <>
      {data.length ? (
        <InifiniteScroll loadMore={getSearchResults} isLoading={isLoading}>
          <List style={{ maxHeight: "400px" }}>
            {data.map(result => {
              const { id, ...props } = mapResult(result) || {};
              return <ResultItem key={id} {...props} />;
            })}
          </List>
        </InifiniteScroll>
      ) : searchTerm ? (
        <p>No results for the term "{searchTerm}"</p>
      ) : (
        <p>Search for a term to see some results</p>
      )}
    </>
  );
};

export default Results;
