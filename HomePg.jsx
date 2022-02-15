import React from 'react';
import { Button, Stack } from '@mui/material'
import bro from './bro.svg';
import { Link } from 'react-router-dom';
import hey from './hey.svg';

import axios from 'axios';

function HomePg() {
    return (
        <>
            <div className='wrapper'>
                <Stack spacing={0} alignItems={"center"}>
                    <p>Welcome to Image Tagger</p>
                    <img src={hey} className='ic' />
                    <Button component={Link} to="/uploading" variant="contained" >Let's Get Started</Button>
                </Stack>
            </div>;
        </>
    );
}

export default HomePg;
