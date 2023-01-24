export async function getProducts() {
        const res = await fetch('/api/products');
        return await res.json();
}

export async function enquireProduct(data) {
    const res = await fetch((`/api/product`), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: data})
    })
    return await res.json();
}
