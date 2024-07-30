import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import toast from 'react-hot-toast';

const ProductForm = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.newProduct);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Smart Phones",
        "Fridge",
        "Wasing Machines",
        "Air Conditioners",
        "Camera",
      ];
      
    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("description", description);
        myForm.set("price", price);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((images) => {
            myForm.append("images", images);
        });
        dispatch(createProduct(myForm));
        console.log("Sucessfully created")
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) { // it is ready in stage 2
                    setImagesPreview((old) => [...old, reader.result]); //add old and new images
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };



    useEffect(() => {
        if (error) {
            console.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Product Created Successfully");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success]);


    return (
        <div>
            <div className="flex items-center justify-center p-1">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form
                        className="py-2 px-9"
                        method="POST"
                        onSubmit={createProductSubmitHandler}
                    >
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className=" block text-base font-medium text-[#07074D]"
                            >
                                Product Name:
                            </label>
                            <input
                                type="name"
                                name="name"
                                id="name"
                                placeholder="Product Name"
                                onChange={(e) => setName(e.target.value)}
                                className=" mb-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />

                            <label
                                htmlFor="description"
                                className="block text-base font-medium text-[#07074D]"
                            >
                                Product Description:
                            </label>
                            <textarea onChange={(e) => setDescription(e.target.value)} id="description" name="description" rows="4" cols="50" className=" mb-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />

                            <label
                                htmlFor="Price"
                                className=" block text-base font-medium text-[#07074D]"
                            >
                                Product Price:
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Product price"
                                onChange={(e) => setPrice(e.target.value)}
                                className=" mb-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            <div className='my-6'>
                                <select onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <label
                                htmlFor="name"
                                className=" block text-base font-medium text-[#07074D]"
                            >
                                Product Stock:
                            </label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Product stock"
                                className="mb-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />

                        </div>

                        <div className="m-4">
                            <label htmlFor="myfile" className=" block text-base font-medium text-[#07074D]">Select a file:</label>

                            <div id="createProductFormFile" className='mb-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'>
                                <input
                                    type="file"
                                    name="product_image"
                                    accept="image/*"
                                    onChange={createProductImagesChange}
                                    multiple
                                />
                            </div>

                            <div id="createProductFormImage" className='flex flex-row overflow-auto' >
                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" className='h-16 w-auto m-4' />
                                ))}
                            </div>

                            <button
                                id="createProductBtn"
                                type="submit"
                                disabled={loading ? true : false}
                                className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductForm
