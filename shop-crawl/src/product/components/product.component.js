import React from 'react'
import DataTable from 'react-data-table-component'

const priceSort = (rowA, rowB) => {

    const PriceA = +(rowA.price.substr(1));
    const PriceB = +(rowB.price.substr(1));
    if (PriceA > PriceB) {
        return 1;
    }

    if (PriceA < PriceB) {
        return -1;
    }

    return 0;
}

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Price',
        selector: row => row.price,
        sortable: true,
        sortFunction: priceSort
    }
];




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

    // const productTable = products.map((product) => {
    //     if (product === null) {
    //         return null;
    //     }
    //     return (
    //     <tr> 
    //         <td>{product.title}</td>
    //         <td>{helperPrice(product.price)}</td>
    //     </tr>
    //     )
    // })

    const data = products.map(({title, price}) => ({
        title:title, price:helperPrice(price)
    }))

    return(
        // <div>
        //     <h2>Products</h2>
        //     <table>
        //         <thead>
        //         <tr>
        //             <th>Title</th>
        //             <th>Price</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //             {productTable}
        //         </tbody>
        //     </table>
        // </div>
        <DataTable
            columns={columns}
            data={data}
        />
    );
};

export default ProductTable;