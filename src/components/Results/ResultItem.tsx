import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  max-height: 60px;
  width: 100%;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  width: 60px;
  justify-content: center;
  align-items: center;
`;

const StyledCardMedia = styled(CardMedia)`
    width: 60px;
    height: 60px;
`

interface ResultItemProps {
  text: string;
  icon?: React.ReactNode;
  imageUrl?: string;
}

const ResultItem: React.FunctionComponent<ResultItemProps> = ({
  icon,
  text,
  imageUrl
}) => {
  return (
    <ListItem>
      <StyledCard>
        {imageUrl ? (
          <StyledCardMedia
            image={imageUrl}
            title={text}
          />
        ) : (
          <StyledListItemIcon>{icon}</StyledListItemIcon>
        )}
        <CardContent>
          <Typography variant="subtitle1">{text}</Typography>
        </CardContent>
      </StyledCard>
    </ListItem>
  );
};

export default ResultItem;
