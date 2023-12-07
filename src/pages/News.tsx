import { FC, useState } from 'react';
import Header from 'components/header';
import { IArticle } from 'models/Article';
import { newsAPI } from 'services/NewsService';

import {
  Card,
  CardHeader,
  CardMedia,
  Button,
  Box,
  Theme,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';

import CancelIcon from '@mui/icons-material/Cancel';

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const News = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const theme: Theme = useTheme();

  const {
    data: articles = [],
    isLoading,
    isFetching,
  } = newsAPI.useGetPostsQuery({
    page,
  });

  const [deletePost, { isLoading: isMutationLoading }] = newsAPI.useDeletePostMutation();

  const handleLoadMore = async () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <>
      <Header isLoading={isLoading || isFetching || isMutationLoading} />

      <Box py={3} px={5}>
        <Grid
          container
          columns={3}
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }} spacing={3} defaultColumns={3}>
            {articles.map((article: IArticle, index) => (
              <NewsCard
                key={index}
                article={article}
                index={index}
                onDelete={async () => {
                  await deletePost(article.id);
                }}
              />
            ))}
          </Masonry>
        </Grid>
        <Box display="flex" justifyContent="center" pt={3}>
          <Button
            sx={{
              background: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                background: theme.palette.primary.main,
              },
            }}
            onClick={handleLoadMore}>
            {t('news.load_more')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

const NewsCard: FC<{ article: IArticle; index: number; onDelete: () => void }> = ({
  article,
  index,
  onDelete,
}) => {
  return (
    <Card key={index} sx={{ position: 'relative' }}>
      <CancelIcon
        onClick={onDelete}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 100,
          color: 'white',
          cursor: 'pointer',
        }}
      />
      <CardMedia
        sx={{
          height: 0,
          paddingTop: '56.25%', // 16:9
        }}
        image={'./empty.webp'}
      />
      <CardHeader
        sx={{
          cursor: 'pointer',
        }}
        title={article.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {article.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default News;
