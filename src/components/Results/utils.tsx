import { Result, Track, Artist, Collection } from "../../types";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import FaceIcon from "@material-ui/icons/Face";

export const getMappedResult = (result: Result) => {
  switch (result.wrapperType) {
    case "track":
      return mapTrack(result as Track);
    case "artist":
      return mapArtist(result as Artist);
    case "collection":
      return mapCollection(result as Collection);
  }
};

const mapTrack = ({
  trackId,
  trackName,
  artistName,
  artworkUrl100
}: Track) => ({
  id: trackId,
  icon: <LibraryMusicIcon fontSize="large" />,
  imageTitle: `${trackName} by ${artistName}`,
  title: trackName,
  subtitle: artistName,
  imageUrl: artworkUrl100
});

const mapArtist = ({ artistId, artistName, primaryGenreName }: Artist) => ({
  id: artistId,
  icon: <FaceIcon fontSize="large" />,
  title: artistName,
  subtitle: primaryGenreName
});

const mapCollection = ({
  collectionId,
  collectionName,
  artworkUrl100,
  artistName
}: Collection) => ({
  id: collectionId,
  icon: <LibraryMusicIcon fontSize="large" />,
  imageTitle: `${collectionName}`,
  imageUrl: artworkUrl100,
  title: collectionName,
  subtitle: artistName
});
