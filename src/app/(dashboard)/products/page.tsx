'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Box, TextField, Grid, CircularProgress, Typography, FormControl, Select, MenuItem, InputAdornment, Button, Paper } from '@mui/material';
import { useProductsStore } from '@/store/useProductsStore';
import ProductCard from '@/components/ProductCard';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';

const LIMIT = 12;

export default function ProductsPage() {
  const { products, total, loading, error, categories, fetchProducts, fetchCategories } = useProductsStore();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); 
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const skip = (page - 1) * LIMIT;
    fetchProducts(skip, LIMIT, debouncedSearch, category);
  }, [page, debouncedSearch, category, fetchProducts]);

  const handleCategoryChange = useCallback((event: any) => {
    setCategory(event.target.value);
    setSearchQuery(''); 
    setDebouncedSearch('');
    setPage(1);
  }, []);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 1400, mx: 'auto', width: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" color="text.primary">
            Products Catalog
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage and track available consultancy packages and services.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 8, px: 3, py: 1.2, whiteSpace: 'nowrap' }}
        >
          New Product
        </Button>
      </Box>
      
      {/* Search and Filters */}
      <Paper elevation={1} sx={{ p: 2, mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search products by name or ID..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={!!category}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, bgcolor: 'background.default' }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
          <FormControl size="small" sx={{ minWidth: 200, bgcolor: 'background.default' }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ color: 'text.primary', borderColor: 'divider', bgcolor: 'background.default' }}>
            More Filters
          </Button>
        </Box>
      </Paper>

      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4, flexGrow: 1, alignContent: 'flex-start' }}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          
          {!loading && products.length === 0 && (
            <Typography textAlign="center" mt={4} color="text.secondary">No products found.</Typography>
          )}

          {/* Pagination */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              Showing <Box component="span" fontWeight="bold" color="text.primary">{products.length > 0 ? (page - 1) * LIMIT + 1 : 0}</Box> to <Box component="span" fontWeight="bold" color="text.primary">{Math.min(page * LIMIT, total)}</Box> of <Box component="span" fontWeight="bold" color="text.primary">{total}</Box> products
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                sx={{ minWidth: 40, width: 40, height: 40, p: 0, borderColor: 'divider', borderRadius: 2 }}
              >
                <ChevronLeftIcon />
              </Button>
              
              <Button variant="contained" size="small" sx={{ minWidth: 40, width: 40, height: 40, p: 0, borderRadius: 2, fontWeight: 'bold' }}>
                {page}
              </Button>
              
              <Button
                variant="outlined"
                size="small"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                sx={{ minWidth: 40, width: 40, height: 40, p: 0, borderColor: 'divider', borderRadius: 2 }}
              >
                <ChevronRightIcon />
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
