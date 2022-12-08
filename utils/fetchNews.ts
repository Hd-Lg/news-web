import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
	category?: Category | string,
	// keywords?: string,
	isDynamic?: boolean
) => {
	// GraphQL query
	const query = gql`
		query MyQuery(
			$access_key: String!
			$categories: String!
			// $keywords: String
		) {
			myQuery(
				access_key: $access_key
				categories: $category
				countries: 'gb, us'
				sort: 'published_desc'
				// keywords: $keywords
				) {
				data {
					author
					category
					country
					image
					description
					published_at
					language
					source
					title
					url
				}
				pagination {
					count
					limit
					offset
					total
				}
			}
		}
	`;
	// Fetch function with caching
	// Two type of info: static and dynamic.
	// Dynamic = for every request fetch new values.
	// Static = as caching for the data but w/ next we can specify for how long to serve the cache before refetching it.

	const res = await fetch(
		'https://oberursel.stepzen.net/api/coy-panda/__graphql',
		{
			method: 'POST',
			cache: isDynamic ? 'no-cache' : 'default',
			next: isDynamic ? { revalidate: 0 } : { revalidate: 30 },
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
			},
			body: JSON.stringify({
				query,
				variables: {
					access_key: process.env.MEDIASTACK_API_KEY,
					categories: category,
					// keywords: keywords,
				},
			}),
		}
	);

	const newsResponse = await res.json();
	// Sort by images vs no images present

	const news = sortNewsByImage(newsResponse.data.myQuery.data);

	return newsResponse;
};

export default fetchNews;
