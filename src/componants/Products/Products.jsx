import React, { useEffect, useState } from 'react'
import { Box, Card, CircularProgress, Divider, Grid, LinearProgress, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './product.css'
import { useNavigate } from "react-router-dom";

const Products = () => {

    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const product = await axios.get('https://fakestoreapi.com/products')

                if (product?.status === 200) {
                    setIsLoading(false)
                    setProduct(product?.data)
                } else {
                    setIsLoading(true)
                }
            } catch (error) {
                console.log(error);

            }

        }

        fetchProducts()


    }, [])

    return (
        <Box className='container-fluid mt-4'>
            {isLoading ? <Box className='text-center mt-5 pt-5'><CircularProgress color="info" /></Box> : <Grid container spacing={7} >
                {product?.map((item, index) => {

                    return (
                        <Grid item xs={12} md={4} lg={3} key={index} className='my-3'>
                            <Tooltip title={item.category} arrow placement='top'>
                                <Box className="text-center border-2 border-info bg-light card" sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <Box className="text-center py-2" >
                                        <img className="w-25 img-fluid animated-image" style={{ minHeight: '140px', maxHeight: '140px' }} src={item.image} alt={item.title} />
                                    </Box>
                                    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "250px" }}>
                                        <Typography variant="body2" className="text-center py-1">{item.category}</Typography>
                                        <Typography variant="body2">{item.title}</Typography>
                                        <Typography variant="body2">{item.price}</Typography>
                                        <Divider className='border-info' />
                                        <Box className="d-flex justify-content-around py-3 text-white bg-info">
                                            <Tooltip title='View Details' arrow>
                                                <RemoveRedEyeIcon className="icon" onClick={() => { navigate(`/product-details/${item?.id}`) 
                                               console.log(item)}
                                                } />
                                            </Tooltip>
                                            <Tooltip title='Add to Favorite' arrow>
                                                <FavoriteIcon className="icon" />
                                            </Tooltip>
                                            <Tooltip title='Add to cart' arrow>
                                                <AddShoppingCartIcon className="icon" />
                                            </Tooltip>

                                        </Box>
                                    </Box>
                                </Box>
                            </Tooltip>
                        </Grid>


                    )


                })}
            </Grid>}
        </Box >
    )
}

export default Products