import React from 'react';
import './TaggingPg.css';
import { Button, Stack, TextField } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

function TaggingPg(props) {

    const { uploads, setUploads } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [index, setIndex] = React.useState(0);
    const [Status, setStatus] = React.useState("Next");

    // const [uploads, setUploads] = React.useState(itemData);

    const updateTag = (e, index) => {
        const newtaguploads = [...uploads];
        console.log(newtaguploads);
        newtaguploads[index].tag = e.target.value;
        setUploads(newtaguploads);

    }

    const updateDisc = (e, index) => {
        const newdiscuploads = [...uploads];
        console.log(newdiscuploads);
        newdiscuploads[index].disc = e.target.value;
        setUploads(newdiscuploads);

    }

    const handleNext = async () => {

        if (index < (uploads.length - 1)) {
            setIndex(index + 1);
            if (index === (uploads.length - 2)) {
                setStatus("Done");
            }
        }
        else {
            handleClickOpen();
        }
    };
    const handleBack = () => {
        if (index > 0) {
            setIndex(index - 1);
            if (index === (uploads.length - 1)) {
                setStatus("Next");
            }
        }
    };
    return (
        <>
            <Stack spacing={10} direction="row">
                <div className='imgwrapper'><img src={uploads[index].img} className='img' /></div>
                <div className='tagwrapper'>
                    <Stack alignItems={"center"}>
                        <h3>Enter the tag for the image shown</h3>
                        {<TextField
                            id="outlined-basic"
                            label="Tag of the image"
                            variant="outlined"
                            className="tagtxt"
                            value={uploads[index].tag}
                            onChange={e => updateTag(e, index)}
                        />}
                        <TextField
                            id="standard-multiline-static"
                            label="Discription (optional)"
                            multiline
                            rows={4}
                            variant="standard"
                            className="disctxt"
                            value={uploads[index].disc}
                            onChange={e => updateDisc(e, index)}

                        />
                        <Stack spacing={10} direction="row" className='bts'>
                            <Button variant="outlined" startIcon={<ArrowBackIos />} className='backbtn' onClick={handleBack} disabled={(index === 0) ? true : false} >Back</Button>
                            <Button variant="outlined" endIcon={<ArrowForwardIos />} className='nextbtn' onClick={handleNext}> {Status}</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Done tagging all images?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        If yes, you will be redirected back to the home page.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button onClick={() => {
                                        setUploads([])
                                    }} component={Link} to="/" autoFocus>
                                        Yes
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Stack>
                    </Stack>
                </div>;
            </Stack >
        </>
    )
}

export default TaggingPg;
