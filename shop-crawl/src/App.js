import React, {useState} from "react";
import {SearchBar, enquireProduct, getProducts, ProductTable} from './product'

const App = () => {
    
    const [query, setQuery] = useState({});
    const [products, setProducts] = useState([]);

    const askQuery = (e) => {
        enquireProduct(query.name).then(response => {
            console.log(response);
            getQuery();
        });
    }

    const getQuery = () => {
        getProducts().then(products => {
            console.log(products);
            setProducts(products);
        });
    }

    // idk why but this will just break rendering even though an effect hook should be used
    // useEffect(() => {
    //     getProducts.then(products => {
    //         console.log(products);
    //         setProducts(products);
    //     });
    // }, []);



    const onChangeForm = (e) => {
        if (e.target.name === 'productQuery') {
            query.name = e.target.value;
        }
        console.log(query);
        setQuery(query);
    }


    return (
        <div>
            <SearchBar 
                onChangeForm={onChangeForm}
                enquireProduct={askQuery}
            />
            <ul>
                <ProductTable products={products}/>
            </ul>
        </div>
       
    );
}

export default App;