import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
// import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
// import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom'


export default function ProductCard({_id,product}) {
  return (
    
    <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="h3">{product.category}</Typography>
        <Link 
          to={`/productDetail/${product._id}`}
          fontWeight="md"
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
        <Typography level="body-sm">
          (Only <b>{product.stock}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="success" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
