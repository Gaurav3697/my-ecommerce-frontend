import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
// import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom'


export default function ProductCard({_id,product}) {
  return (
    
    <Card sx={{ width: 300, maxWidth: '100%', boxShadow: 'lg' }}>
      <CardOverflow>
        <AspectRatio sx={{ height: 1 }}>
          <img
            src={product.images[0].url}
            alt=""
            className='size-fit'
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-sm">{product.category}</Typography>
        <Link 
          to={`/productDetail/${product._id}`}
          className='text-2xl font-bold'
          color="neutral"
          textcolor="text.primary"
        >
          {product.name} 
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
        //   endDecorator={
        //      <Chip component="span" size="sm" variant="soft" color="success"> //In future I may use it
        //        Lowest price
        //      </Chip>
        //   }
        >
          रु {product.price}
        </Typography>
        <Typography level="body-md">
          (Only <b>{product.stock}</b> left in stock!)
        </Typography>

        <Typography level="body-sm">
          {`Rating: ${product.rating} stars (${product.reviews.length} Reviews)`}
        </Typography>

      </CardContent>
      <CardOverflow>
      <Link 
          to={`/productDetail/${product._id}`}
          className="block w-full m-auto text-white bg-indigo-700 text-lg font-semibold rounded-xl hover:bg-indigo-600 cursor-pointer hover:shadow-xs p-3 my-4"
        >
          ADD TO CART
        </Link>
      </CardOverflow>
    </Card>
  );
}
