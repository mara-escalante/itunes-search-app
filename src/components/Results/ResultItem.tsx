import React from "react";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  width: 100px;
  justify-content: center;
  align-items: center;
`;

const StyledCardMedia = styled(CardMedia)`
  min-width: 100px;
  height: auto;
`;

interface ResultItemProps {
  title: string;
  subtitle: string;
  imageTitle?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
}

const ResultItem: React.FunctionComponent<ResultItemProps> = ({
  icon,
  imageTitle,
  imageUrl,
  title,
  subtitle
}) => {
  return (
    <ListItem>
      <StyledCard>
        {imageUrl ? (
          <StyledCardMedia image={imageUrl} title={imageTitle} />
        ) : (
          <StyledListItemIcon>{icon}</StyledListItemIcon>
        )}

        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography style={{ color: "grey" }} variant="subtitle2">
            {subtitle}
          </Typography>
        </CardContent>
      </StyledCard>
    </ListItem>
  );
};

export default ResultItem;
