
const SearchBar = ({onChangeForm, enquireProduct, getProducts}) => {
        return (
        <form>
                <label htmlFor="header-search">
                        <span className="visually-hidden">Search Products</span>
                </label>
                <input
                        type="text"
                        onChange={(e) => onChangeForm(e)}
                        id="header-search"
                        placeholder="Search Products"
                        name="productQuery"
                />   
                <button type='button' onClick= {(e) => enquireProduct().then(() => getProducts())}>Submit</button>         
        </form>
        )
        
}

export default SearchBar;