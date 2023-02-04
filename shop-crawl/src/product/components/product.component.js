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

    const data = products.filter(product => product).map(({title, price, link}) => ({
        title:title, price:helperPrice(price), link:link
    }))

    return(
        <DataTable
            columns={columns}
            data={data}
            pagination
            onRowClicked={(row) => {window.open(row.link)}}
        />
    );
};

export default ProductTable;