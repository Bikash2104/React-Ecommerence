import { useState, useEffect } from "react";
import axios from "axios";


export function Fakestore() {



    const [Categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{ id: '', title: '', price: 0, description: '', category: '', Image: '', rating: { rate: 0, count: 0 } }]);
    const [cartItem, setCartItem] = useState([]);
    const [itemCount, setItemCount] = useState(0);



    function LoadCategories() {
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => {
                response.data.unshift("all");
                setCategories(response.data)
            })

    }

    function LoadProducts(url) {
        axios.get(url)
            .then(response => {
                setProducts(response.data)
            })

    }

    function handleCategoryChange(e) {
        if (e.target.value === "all") {
            LoadProducts('https://fakestoreapi.com/products');
        } else {
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
        }
    }


    function NavbarButtonClick(categoryName) {
        if (categoryName === "all") {
            LoadProducts('https://fakestoreapi.com/products');
        } else {
            LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
        }
    }

    function handaleAddClick(product) {
        cartItem.push(product);
        alert(`${product.title} added successfully...`);
        setItemCount(cartItem.length);
    }


    useEffect(() => {
        LoadCategories();
        LoadProducts('https://fakestoreapi.com/products');
    }, [])




    return (
        <div className="container-fluid">
            <header>
                <div className="d-flex bg-black text-white p-2 justify-content-between">
                    <div>
                        <span className="h2">Fakestore</span>
                    </div>
                    <div className="fs-5">
                        <span className="ps-3"><button onClick={() => NavbarButtonClick('all')} className="btn btn-light">Home</button></span>
                        <span className="ps-3"><button onClick={() => NavbarButtonClick('electronics')} className="btn btn-light">Electronic</button></span>
                        <span className="ps-3"><button onClick={() => NavbarButtonClick('jewelery')} className="btn btn-light">Jewelery</button></span>
                        <span className="ps-3"><button onClick={() => NavbarButtonClick("men's clothing")} className="btn btn-light">Men's clothing</button></span>
                        <span className="ps-3"><button onClick={() => NavbarButtonClick("women's clothing")} className="btn btn-light">Women's clothing</button></span>


                    </div>
                    <div>
                        <button data-bs-target="#cart" data-bs-toggle="modal" className=" bi bi-cart4 btn btn-warning position-relative"><span className="rounded rounded-circle badge bg-danger position-absolute">{itemCount}</span></button>
                        <div className="modal fade" id="cart">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="text-primary">your cart items</h2>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Preview</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartItem.map(item =>
                                                        <tr key={item.id}>
                                                            <td>{item.title}</td>
                                                            <td><img height="50" width="50" src={item.image} /></td>
                                                            <td>{item.price}</td>
                                                        </tr>

                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="row">
                <nav className="col-2">
                    <label className="form-label mt-4 fw-bold">Select Category</label>
                    <select className=" fw-bold form-select" onChange={handleCategoryChange}>
                        {
                            Categories.map(Category => <option key={Category} value={Category}>{Category.toUpperCase()}</option>)
                        }
                    </select>

                </nav>
                <main className="col-10 d-flex flex-wrap overflow-auto">
                    {

                        products.map(product =>
                            <div className="card p-2 m-2" style={{ width: '200px' }}>
                                <img src={product.image} className="card-image-top" height="120px" width="140px" />
                                <div className="card-header overflow-auto" style={{ height: '120px' }}>
                                    <div>{product.title}</div>
                                </div>
                                <div className="card-body">
                                    <dl>
                                        <dt>Price</dt>
                                        <dd>{product.price.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}</dd>
                                        <dt>Rating</dt>
                                        <dd>
                                            <span className="bg-success badge rounded p-2">{product.rating.rate}<span className="bi bi-star-fill"></span></span><span className="text-secondary fw-bold">{product.rating.count}</span>
                                        </dd>
                                    </dl>
                                </div>
                                <div className="card-footer">
                                    <button onClick={() => { handaleAddClick(product) }} className="btn btn-warning bi bi-cart4 w-100"> Add to Cart </button>
                                </div>


                            </div>
                        )


                    }

                </main>
            </section>


        </div>

    )
}