// Change it to this:
const STATAMIC_API = import.meta.env.STATAMIC_API_URL;

if (!STATAMIC_API) {
    throw new Error("STATAMIC_API_URL is undefined. Check Cloudflare Dashboard vars.");
}

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

export async function getPost(slug: string) {
    return getEntries(`posts/${slug}`);
}

export async function getProducts() {
    return getEntries('products');
}

export async function getProduct(slug: string) {
    return getEntries(`products/${slug}`);
}
