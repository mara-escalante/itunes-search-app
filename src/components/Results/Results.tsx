import React from "react";

interface ResultsProps {
  data: {
    trackid: string;
    artistName: string;
    trackName: string;
  }[];
}

const Results: React.FunctionComponent<ResultsProps> = ({ data }) => {
  return (
    <div>
      <h1>Results List</h1>
      {data.length ? (
        <ul>
          {data.map(({ trackid, trackName, artistName }) => (
            <li key={trackid}>{trackName} - {artistName}</li>
          ))}
        </ul>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default Results;
