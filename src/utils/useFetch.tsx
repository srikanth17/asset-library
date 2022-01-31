import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ApiResponse, Asset } from '../types/Asset';

const useFetch = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get<ApiResponse>(
          'https://tech-test-service-staging.seenit.studio/v1/uploads',
          {
            headers: {
              authorization: 'BASIC srikanth.dorairaj@gmail.com',
            },
            params: { page },
          }
        );
        if (response) {
          setAssets(prev =>
            Array.from(new Set([...prev, ...response.data.rows]))
          );
          setHasMore(response.data.rows.length > 0);
          setLoading(false);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error.response?.data);
        setError(true);
      }
    };
    fetchItems();
  }, [page]);

  return { loading, error, assets, hasMore };
};

export default useFetch;
