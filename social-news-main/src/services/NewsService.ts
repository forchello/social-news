import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticle, IPostsParams } from "models/Article";

export const newsAPI = createApi({
    reducerPath: 'newsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://json-news-server.vercel.app',
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        getPosts: build.query<IArticle[], IPostsParams>({
            query: (params) => ({
                url: '/posts',
                params: {
                    limit: 6,
                    ...params
                }
            }),
            providesTags: () => ['Post'],
            transformResponse: (response: IArticle[]) => response,
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems) => {
                currentCache.push(...newItems)
            },
            forceRefetch({ currentArg, previousArg }) {
                return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
            }
        }),
        deletePost: build.mutation<void, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(id, { dispatch }) {
                dispatch(newsAPI.util.updateQueryData('getPosts', {}, (draft) => {
                    return draft?.filter((post) => post.id !== id);
                }));
            }
        })
    })
});
