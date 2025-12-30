const STATAMIC_API = 'https://aas-production.up.railway.app/api';

export async function getPosts() {
    try {
        const response = await fetch(`${STATAMIC_API}/collections/posts/entries`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
}
