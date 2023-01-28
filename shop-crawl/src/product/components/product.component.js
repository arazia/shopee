import React from 'react'

const ProductTable = ({products}) => {
    if (products.length === 0) {
        return null;
    }

    const helperPrice = (price) => {
        if (price === "") {
            return "Unavailable"
        }
        return price;
    }

    const productTable = products.map((product) => {
        if (product === null) {
            return null;
        }
        return (
        <tr> 
            <td>{product.title}</td>
            <td>{helperPrice(product.price)}</td>
        </tr>
        )
    })

    return(
        <div>
            <h2>Products</h2>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                    {productTable}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable;