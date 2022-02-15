import React from 'react';
import './UploadPg.css';
import { Button, Stack } from '@mui/material'
import bro from './bro.svg'
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';
import StandardImageList from './StandardImageList';

import axios from 'axios';

const Input = styled("input")({
    display: "none"
});

function UploadPg(props) {

    const { uploads, setUploads } = props;
    console.log(uploads);
    const [uploaded, setUploaded] = React.useState(0);
    const handelInput = async (e) => {

        const data = new FormData();

        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            if (!file.type.startsWith('image/')) {
                continue
            }
            uploads.push({ id: file.name, img: URL.createObjectURL(file), tag: '', disc: '' })
            setUploads(uploads);

            data.append("uploaded pics", file);
        }

        if (uploads.length > 0) {
            setUploaded(1)
        }

        await axios.post("http://localhost:5000", data);

    }

    if (uploaded === 0) {
        return (
            <>
                <div className='wrapper'>
                    <Stack spacing={0} alignItems={"center"}>
                        <label>
                            <Input accept="image/*" multiple type="file" onChange={handelInput} />
                            <h4>Click here to add the images</h4>
                        </label>
                        <img src={bro} className='ic' />
                    </Stack>
                </div>;
            </>
        )

    }
    else {
        return (
            <>
                <div className='wrapper'>
                    <Stack spacing={0} alignItems={"center"}>
                        <p id='preview'>Preview</p>
                        <StandardImageList uploaded={uploaded} setUploaded={setUploaded} uploads={uploads} setUploads={setUploads} />
                        <Button component={Link} to="/tagging" variant="contained" >Upload</Button>
                    </Stack>
                </div>;
            </>
        );
    }
}

export default UploadPg;
