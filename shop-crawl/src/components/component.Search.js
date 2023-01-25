const SearchBar = () => {
        return (
        <form action ="/" method = 'get'>
                <label htmlFor="header-search">
                        <span className="visually-hidden">Search Products</span>
                </label>
                <input
                        type="text"
                        id="header-search"
                        placeholder="Search Products"
                        name="productQuery"
                />   
                <button type='submit'>Submit</button>         
        </form>
        )
        
}

export default SearchBar;