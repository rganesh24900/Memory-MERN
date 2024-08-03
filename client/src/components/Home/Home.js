import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { getPosts } from '../../actions/posts';
import Pagination from '../Pagination';
import { useDispatch } from 'react-redux';
import useStyles from './style'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';
import ChipInput from 'material-ui-chip-input'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');


    useEffect(() => {
        dispatch(getPosts)
    }, [currentId, dispatch])

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            setSearch(e.target.value);
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={search} onClick={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress}/>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home