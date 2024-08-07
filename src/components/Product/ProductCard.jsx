import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
// import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';


export default function ProductCard({ product }) {
  return (

    <Card className='w-auto md:w-1/4'>
      <CardOverflow>
        <img
          src={product.images[0].url}
          alt=""
          className='object-contain w-auto h-auto md:h-44 md:w-auto'
        />
      </CardOverflow>
      <CardContent>
        <Typography level="title-sm">{product.category}</Typography>
        <Link
          to={`/productDetail/${product._id}`}
          className='text-md font-bold'
          color="neutral"
          textcolor="text.primary"
        >
          {product.name}
        </Link>

        <Typography
          level="title-lg"
        //   endDecorator={
        //      <Chip component="span" size="sm" variant="soft" color="success"> //In future I may use it
        //        Lowest price
        //      </Chip>
        //   }
        >
          रु {product.price}
        </Typography>
        <Typography level="body-sm">
          (Only <b>{product.stock}</b> left in stock!)
        </Typography>

        <Typography level="body-sm">
          {/*  */}
          <Rating
        name="simple-controlled"
        value={product.rating}
        readOnly 
      /> <br/>{`(${product.reviews.length} Reviews)`}
        </Typography>
        <Link
          to={`/productDetail/${product._id}`}
          className="block w-full m-auto text-gray-900 text-center bg-gray-300 text-lg font-semibold rounded-xl hover:bg-gray-600 cursor-pointer hover:shadow-xs p-1 my-2"
        >
          ADD TO CART
        </Link>
      </CardContent>
    </Card>
  );
}
