
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
        const json = await response.json();
        return json.data || json;
    } catch (error) {
        console.error(`Failed to fetch ${collection}:`, error);
        return [];
    }
}

export async function getGlobal(handle: string) {
    try {
        const response = await fetch(`${STATAMIC_API}/globals/${handle}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json.data || json;
    } catch (error) {
        console.error(`Failed to fetch global ${handle}:`, error);
        return null;
    }
}

export async function getApplications() {
    return getEntries('collections/applications/entries');
}

export async function getPosts() {
    return getEntries('collections/posts/entries');
}

export async function getPost(slug: string) {
    // Note: This assumes filtering by slug on the entries endpoint, 
    // or you might need to fetch all and find. 
    // Statamic doesn't show by slug by default on a simple path unless configured.
    // For now, let's try the filter approach if the API supports it, or leave as is if undecided.
    // But '/posts/slug' is definitely wrong.
    // Let's use filter.
    const data = await getEntries(`collections/posts/entries?filter[slug]=${slug}`);
    return data[0];
}

export async function getProducts() {
    return getEntries('collections/products/entries');
}

export async function getProduct(slug: string) {
    const data = await getEntries(`collections/products/entries?filter[slug]=${slug}`);
    return data[0];
}
