const STATAMIC_API = 'http://localhost:8000/api';

export async function getPosts() {
    try {
        const response = await fetch(`${STATAMIC_API}/collections/posts/entries`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
}
