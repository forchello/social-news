## Social News - [Link](https://forchello.github.io/social-news)

### Prerequisites

- ```NodeJS 14+```

### Setup

- ```npm i```
- ```npm run start```

### Web application that can display the following pages:

- ```/``` - main, arbitrary content.
- ```/news``` – page with news using own [API](https://github.com/forchello/json-news-server). Implemented the "upload more" button when clicking on which the posts are loaded, implemented the deletion of the news.
- ```/profile``` - page with arbitrary text, inaccessible without authorization.
- ```/login``` - page for authorization.

On the website, in the header or in the basement, implement the link:

The login form accepts "fake" data:
- ```username: admin```
- ```password: 12345```


### If other data is entered, the following message is displayed:
```Username or password entered incorrectly.```

If the correct data is entered, redirects to the /profile page.
If you try to go to the /profile page without authorization, you will be redirected to the main page.

### APPLICATION REQUIREMENTS:

Stores user authorization information in localStorage. 
If the user has authorized and reloaded the page, the authorization should not "lose".

### The following stack: 
- ```react```
- ```react-router-dom```
- ```react-redux```
- ```@reduxjs/toolkit```
- ```typescript```