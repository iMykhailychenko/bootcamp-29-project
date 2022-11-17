import { useMemo, useState } from 'react';

import debounce from 'lodash/debounce';
import { privateApi } from '../http/http';

export const ProductsSelect = ({ onSelect }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(null);

    const [value, setValue] = useState('');

    const fetchProducts = useMemo(
        () =>
            debounce((search) => {
                if (search.length < 1) {
                    return;
                }

                setIsLoading(true);
                privateApi
                    .get('/product', { params: { search } })
                    .then(({ data }) => setProducts(data))
                    .finally(() => {
                        setIsLoading(false);
                    });
            }, 500),
        []
    );

    const handleChange = (event) => {
        const { value } = event.target;
        setValue(value);
        fetchProducts(value.trim());

        if (value.trim().length < 1) {
            setProducts(null);
        }
    };

    const handleSelectProduct = (product) => {
        setValue(product.title.ua);
        setProducts(null);
        onSelect(product._id);
    };

    return (
        <>
            <input type="text" placeholder="Search product" value={value ?? ''} onChange={handleChange} />
            {isLoading && <p>Loading...</p>}
            {products &&
                products.map((product) => (
                    <button
                        key={product._id}
                        type="button"
                        style={{ display: 'block' }}
                        onClick={() => handleSelectProduct(product)}>
                        {product.title.ua}
                    </button>
                ))}
        </>
    );
};
