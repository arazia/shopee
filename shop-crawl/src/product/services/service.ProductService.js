export const getProducts = async() => {
        const res = await fetch('/api/products');
        return await res.json();
}

export const enquireProduct = async(query) => {
    const res = await fetch((`/api/product`), {
        method: 'POST',
        body: JSON.stringify({product: query})
    })
    return await res.json();
}
