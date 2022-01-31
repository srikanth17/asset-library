import { useState } from 'react';
import { Card, CardMedia, Grid, Modal, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Duration from './Duration';
import { Asset } from '../types/Asset';

const StyledCard = styled(Card)({
  width: '200px',
  marginBottom: '8px',
  borderRadius: '10px',
  position: 'relative',
});

const LikesWrapper = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  float: 'right',
});

const LikeIcon = styled(FavoriteIcon)({
  color: 'red',
  paddingLeft: '4px',
});

const StyledBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '78vh',
  backgroundColor: 'white',
  border: '2px solid #000',
  padding: '2rem',
});

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const { firstName, lastName, thumbnailUrl } = asset;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fullName = firstName + ' ' + lastName;

  return (
    <>
      <StyledCard>
        <Duration duration={asset.duration} />
        <CardMedia
          component="img"
          height="200"
          image={thumbnailUrl}
          alt={firstName}
          onClick={handleOpen}
        />
      </StyledCard>
      <Grid container>
        <Grid item xs={9}>
          <Typography>{fullName}</Typography>
        </Grid>
        <LikesWrapper item xs={3}>
          <span>{asset.likes}</span>
          <LikeIcon />
        </LikesWrapper>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <StyledBox>
          <Typography variant="h6" component="h2">
            {fullName}
          </Typography>
          <Grid container>
            <Grid item sm={12} xs={12}>
              <img src={thumbnailUrl} alt={fullName} />
            </Grid>
          </Grid>
        </StyledBox>
      </Modal>
    </>
  );
};

export default AssetCard;
