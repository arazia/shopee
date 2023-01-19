import React, {useState, useEffect} from "react";
import {SearchBar, enquireProduct, getProducts} from './product'

const App = () => {
    
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);

    const askQuery = (e) => {
        enquireProduct(this.state.query).then(response => {
            console.log(response);
        });
    }

    const getQuery = () => {
        getProducts.then(products => {
            console.log(products);
            setProducts(products);
        });
    }

    // useEffect(() => {
    //     getProducts.then(products => {
    //         console.log(products);
    //         setProducts(products);
    //     });
    // }, []);



    const onChangeForm = (e) => {
        let query = this.state.query;
        if (e.target.name == 'productQuery') {
            query = e.target.value;
        }
        setQuery(query);
    }


    return (
        <div>
            <SearchBar 
                query={query}
                onChangeForm={onChangeForm}
                enquireProduct={askQuery} 
            />
            {/* <ul>
                {products.map((product) => {
                    <li>{product.title} : {product.price}</li>
                })}
            </ul> */}
        </div>
       
    );
}

export default App;