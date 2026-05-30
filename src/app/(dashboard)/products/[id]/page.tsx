'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Grid, Rating, Chip, Divider } from '@mui/material';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProductsStore } from '@/store/useProductsStore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LabelIcon from '@mui/icons-material/Label';

export default function SingleProductPage() {
  const { id } = useParams();
  const { selectedProduct, loading, error, fetchProductById } = useProductsStore();
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchProductById(id as string);
    }
  }, [id, fetchProductById]);

  useEffect(() => {
    if (selectedProduct && selectedProduct.images.length > 0) {
      setSelectedImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
        <Button startIcon={<ArrowBackIcon />} component={Link} href="/products" sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Box>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          component={Link} 
          href="/products" 
          color="inherit"
          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}
        >
          Back to Products
        </Button>
      </Box>
      
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Column: Image Gallery */}
        <Grid item xs={12} md={6} lg={7}>
          <Paper elevation={1} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box 
              sx={{ 
                width: '100%', 
                height: { xs: 300, md: 500 }, 
                bgcolor: 'background.default',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedImage || selectedProduct.thumbnail} 
                alt={selectedProduct.title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 6 }, '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 3 } }}>
              {selectedProduct.images.map((img, idx) => (
                <Box 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  sx={{ 
                    cursor: 'pointer', 
                    border: '2px solid',
                    borderColor: selectedImage === img ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    minWidth: 80,
                    width: 80,
                    height: 80,
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                    opacity: selectedImage === img ? 1 : 0.7,
                    transition: 'all 0.2s'
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        {/* Right Column: Product Details */}
        <Grid item xs={12} md={6} lg={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper elevation={1} sx={{ p: 4 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.05em', fontWeight: 600 }}>
                  {selectedProduct.category}
                </Typography>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ mt: 1, mb: 2 }}>
                  {selectedProduct.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Rating value={selectedProduct.rating} readOnly precision={0.1} sx={{ color: 'secondary.main' }} />
                  <Typography variant="body1" fontWeight="600">{selectedProduct.rating}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({selectedProduct.reviews?.length || 0} reviews)
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" color="primary.main" fontWeight="bold">
                  ${selectedProduct.price}
                </Typography>
                {selectedProduct.discountPercentage > 0 && (
                  <Typography variant="body2" color="error.main" sx={{ mt: 1, fontWeight: 500 }}>
                    {selectedProduct.discountPercentage}% OFF
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {selectedProduct.tags?.map((tag) => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    icon={<LabelIcon fontSize="small" />} 
                    sx={{ bgcolor: 'background.default', color: 'text.secondary' }} 
                  />
                ))}
              </Box>
              
              <Typography variant="h6" gutterBottom fontWeight="600">Product Description</Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                {selectedProduct.description}
              </Typography>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  startIcon={<ShoppingCartIcon />} 
                  fullWidth
                  sx={{ py: 1.5, fontSize: '1.1rem' }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Paper>

            <Paper elevation={1} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
                Delivery & Services
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocalShippingIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">Shipping Information</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedProduct.shippingInformation}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <AssignmentReturnIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">Return Policy</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedProduct.returnPolicy}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <VerifiedUserIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">Warranty</Typography>
                    <Typography variant="body2" color="text.secondary">{selectedProduct.warrantyInformation}</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
