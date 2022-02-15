import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { Clear } from '@material-ui/icons';
import './StandardImageList.css';
import axios from 'axios';

export default function StandardImageList(props) {
    const { uploaded, setUploaded, uploads, setUploads } = props;

    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:5000").then((response) => {
            setItems(response.data);
            console.log(response.data)
        });
    }, []);

    const handleClick = async (_id) => {
        setItems(items.filter((i) => {
            return i._id != _id;
        }));
        await axios.delete("http://localhost:5000", { data: { _id: _id, } },)
        if (uploads.length < 2) {
            setUploaded(0);
        }
    };

    return (
        <ImageList className='sil' sx={{ width: 344, height: 344 }} cols={3} rowHeight={130}>
            {items.map((item) => (
                <>
                    <ImageListItem key={item._id}>
                        <img
                            src={"http://localhost:5000/" + item.pic}
                            alt="Image got fuckedup!"
                            loading="lazy"
                        />
                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    onClick={() => { handleClick(item._id) }}
                                >
                                    <Clear />
                                </IconButton>
                            }
                            actionPosition="right"
                        />
                    </ImageListItem>
                </>
            ))}
        </ImageList>
    );
}