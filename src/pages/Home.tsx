import Header from 'components/header';
import { Box, Link, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Home = () => {
   const { t } = useTranslation();

   return (
      <>
          <Header/>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8 }}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', py: 8,  px: { xs: 2, sm: 8 }, gap: 1, width: { xs: '80%', sm: '40vh' } }}>
                  <Typography variant="h5" sx={{mb:2}}>
                      {t('home.title')}
                  </Typography>
                  <Link variant="h5" sx={{cursor: 'pointer'}} onClick={() => window.open('https://github.com/forchello/json-news-server')}>
                      {t('home.link')}
                  </Link>
              </Paper>
          </Box>
      </>
  );
};

export default Home;