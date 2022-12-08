import { categories } from '../constants';
import fetchNews from '../utils/fetchNews';

export default async function Home() {
	// fetch news data from api
	const news: NewsResponse = await fetchNews(categories.join(','));
	console.log(news);
	return <div></div>;
}
