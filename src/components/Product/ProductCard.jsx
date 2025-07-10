import { Link } from 'react-router-dom'


export default function ProductCard({ product }) {
  return (

    <div className='w-auto md:w-1/4'>
      <Link
          to={`/productDetail/${product._id}`}
          className='text-md roboto-mono-regular text-white'
          color="neutral"
          
        >
        <img
          src={product.images[0].url}
          alt=""
          className='object-contain w-auto h-auto md:h-44 md:w-auto'
        />
        
          {product.name}<br/>
        रु {product.price}
        </Link>
      <div>

        <Link
          to={`/productDetail/${product._id}`}
          className="block w-full text-white text-lg inter-regular rounded-xl hover:cursor-pointer hover:text-gray-400 hover:shadow-xs p-1 my-2"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
}
