import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const MessageContainer = styled("div")`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface NoResultsMessageProps {
  searchTerm: string;
  isLoading: boolean;
  error: string;
}

const NoResultsMessage: React.FC<NoResultsMessageProps> = ({
  isLoading,
  error,
  searchTerm
}) => {
  return (
    <MessageContainer>
      {isLoading && (
        <CircularProgress />
      )}
      {error && (
        <Typography variant="h6">{error}, please try again</Typography>
      )}
      {!isLoading && !error && 
      (searchTerm ? (
        <Typography variant="h6">No results for the term "{searchTerm}"</Typography>
      ) : (
        <Typography variant="h6">Type a search term to see some results</Typography>
      ))}
    </MessageContainer>
  );
};

export default NoResultsMessage;
