import { useRef, useState, useCallback } from 'react';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import AssetCard from './AssetCard';
import useFetch from '../utils/useFetch';

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  padding: '40px 0',
});

const App = () => {
  const [page, setPage] = useState(1);
  const { assets, loading, error, hasMore } = useFetch(page);
  const observer = useRef<IntersectionObserver>();
  const lastAssetCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} sm={10} md={12} lg={11} xl={9}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <StyledTypography variant="h2">Library</StyledTypography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {assets.map((asset, index) => {
                if (assets.length === index + 1) {
                  return (
                    <Grid
                      ref={lastAssetCardRef}
                      key={index}
                      item
                      xs={12}
                      sm={4}
                      lg={2}
                    >
                      <AssetCard data-testid="asset" asset={asset} />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid key={index} item xs={12} sm={4} lg={2}>
                      <AssetCard data-testid="asset" asset={asset} />
                    </Grid>
                  );
                }
              })}
              {loading && <CircularProgress />}
              {error && <div>Error</div>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
