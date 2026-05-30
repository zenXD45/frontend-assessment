import React, { memo } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating, Chip, CardActionArea } from '@mui/material';
import { Product } from '@/store/useProductsStore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardActionArea 
        component={Link} 
        href={`/products/${product.id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}
      >
        <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', bgcolor: 'background.default' }}>
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }}
          />
          <Chip 
            label={product.brand || 'Standard'} 
            size="small" 
            sx={{ 
              position: 'absolute', 
              top: 12, 
              left: 12, 
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              fontWeight: 600,
              fontSize: '0.7rem'
            }} 
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
          <Typography 
            variant="overline" 
            color="text.secondary" 
            sx={{ letterSpacing: '0.05em', fontWeight: 600, lineHeight: 1.2, mb: 1, display: 'block' }}
          >
            {product.category}
          </Typography>
          
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, lineHeight: 1.3, mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Rating value={product.rating} readOnly precision={0.1} size="small" sx={{ color: 'secondary.main' }} />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>
              {product.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              ({product.stock} in stock)
            </Typography>
          </Box>
          
          <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" color="primary.main" fontWeight="bold">
              ${product.price}
            </Typography>
            <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
