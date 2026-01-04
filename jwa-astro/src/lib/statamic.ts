const STATAMIC_API = 'https://aas-production.up.railway.app/custom-api';

export async function getEntries(collection: string) {
    try {
        const response = await fetch(`${STATAMIC_API}/${collection}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${collection}:`, error);
        return [];
    }
}

export async function getPosts() {
    return getEntries('posts');
}

export async function getProducts() {
    return getEntries('products');
}
