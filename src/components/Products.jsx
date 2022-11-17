import { useCallback, useState } from 'react';

import debounce from 'lodash/debounce';
import { privateApi } from '../http/http';
import { useSelector } from 'react-redux';

export const Products = () => {
    const dailyRate = useSelector((state) => state.user.data?.userData?.dailyRate);

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(null);
    console.log(products);

    const [value, setValue] = useState('');

    const fetchProducts = useCallback(
        debounce((search) => {
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
        setValue(event.target.value);

        if (event.target.value.trim()) {
            fetchProducts(event.target.value);
        }
    };

    return dailyRate ? (
        <>
            <input type="text" value={value} onChange={handleChange} />

            {isLoading && <p>Loading ...</p>}

            {products &&
                products.map((product) => (
                    <button key={product._id} type="button">
                        {product.title.ua}
                    </button>
                ))}

            <br />
            <br />
            <hr />
            <br />
            <br />
        </>
    ) : (
        <p>Please, count your daily rate first!</p>
    );
};
