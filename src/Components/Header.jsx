import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import { CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
const Header = (props) => {
 
  const [data, setData] = useState({venueName:"",imageUrl:"",description:"",location:"",capacity:""});
 //Token will come when user login and we fetch it from localStorage 
 const userData = JSON.parse(localStorage.getItem("user"));
  const searchHandler = (e) => {
    e.preventDefault();
    props.setSearch(e.target.value);
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  console.log(data);
  const submitHandler = async () => {
      setLoading(true);
     console.log(data);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        };
        
        const response = await axios.post(
         "https://eventeclipsebackend.onrender.com/api/v1/venues",
          data,
          config
        );

        console.log("Submitted :", response);
        setLoading(false);
      }catch(error){
        setLoading(false);
        console.log("Data has not submitted yet" , error);
      }
  };
  
  const changeHandler = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-[90%] m-auto mt-auto">
    <div className="flex justify-between h-24 items-center">
        <div className="w-50 flex flex-col gap-2">
          <h1 className='text-3xl'>Vanues Near You</h1>
          <div className="w-32 h-1 bg-blue-600 rounded-md"></div>
        </div>
        <div className ="flex gap-10 items-center">
           <div className="w-18 flex flex-col cursor-pointer parent">
             <Button className='text-xl' onClick={handleOpen} >Join Us</Button>
             <div className="child">
             </div>
           </div>
           <div>
             <Paper
               component="form"
               sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
             >
          
               <InputBase
                 sx={{ ml: 1, flex: 1 }}
                 placeholder="Your Location"
                onChange={searchHandler}
               />
               <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                 <SearchIcon />
               </IconButton>
             
             
             </Paper>
           </div>
        </div>
    </div>
      <div>
        
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 560,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
          
              {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height:500 }} ><CircularProgress thickness={1} /></Box> : <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <h1 className='text-xl'>Your Vanue Details</h1>
                 <TextField
                   required
                   id="outlined-required"
                   label="Name of Your Venue"

                   name="venueName"
                   onChange={changeHandler}
                 />
                <TextField
                   required
                   id="outlined-required"
                   label="Paste Your Img Url"

                  name="imageUrl"
                   onChange={changeHandler}
                 />
                <TextField
                   required
                   id="outlined-required"
                   label="location"

                  name="location"
                   onChange={changeHandler}
                 />
                <TextField
                  id="outlined-number"
                  label="Capacity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="capacity"
                   onChange={changeHandler}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Discription"
                  multiline
                  rows={4}

                  name="description"
                   onChange={changeHandler}
                />
                  <Button type='submit' variant="contained">Submit</Button>
                </form>}
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
    
  )
}
export default Header;