import Link from 'next/link'
import { useRouter } from 'next/router'

import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../../components/header';

function Products({ posts, categories }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (<>
        <Header data={categories}/>
        <main>
            <Container maxWidth='lg' xs={{ pb: 6 }}>
                <Grid container spacing={2} >
                    {posts.map( post => (
                        <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`}>
                            <Grid item xs={6} sm={4} md={3}>
                                <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '0'}}>
                                    <CardMedia 
                                        xs={{ }}
                                        component="img" 
                                        image={post.product_image?.[0]?.image}
                                        alt={post.product_image?.[0]?.alt_text}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom component='p'>
                                            {post.title}
                                        </Typography>
                                        <Box component='p' fontSize={16} fontWeight={900}>
                                            £{post.regular_price}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Link>
                        
                    ))}
                </Grid>
            </Container>
        </main>
    </>)
}

export async function getStaticPaths(){
    return{
      paths: [{params: { slug: "shoes" } }],
      fallback: true,
    };
  }

export async function getStaticProps({ params }) {
    const res = await fetch(`http://127.0.0.1:8000/api/category/${params.slug}`);
    const posts = await res.json()

    const res_cats = await fetch('http://127.0.0.1:8000/api/category/')
    const categories = await res_cats.json()

    return {
        props: {
            posts,
            categories
        }
    }
}

export default Products
