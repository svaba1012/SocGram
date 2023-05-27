import React from 'react';
import { TextField, InputAdornment, Divider, Box, List } from '@mui/material';

import CustomUserListItem from './CustomUserListItem';
import {searchUsers} from "../../actions/user-actions"



let timeoutId = null;

function SearchUser({isLink, onItemClicked}) {

    const [searchText, setSearchText] = React.useState("");
    const [suggestedUsers, setSuggestedUsers] = React.useState({isLoading: false, isError: false, users:[]});

    if(!onItemClicked){
        onItemClicked = (u) => {};
    }

    const handleOnChange = (e) => {
        let val = e.target.value;
        console.log(val)
        setSearchText(val)
    
        console.log(timeoutId)
        if(timeoutId ){
          clearTimeout(timeoutId)
          console.log("Brisanje")
        }
        timeoutId = setTimeout(async() => {
          setSuggestedUsers({isLoading: true});
          let users = await searchUsers(val);
          setSuggestedUsers({isLoading: false, users: users});
          console.log(suggestedUsers);
        }, 1000);
        
      }

    return (
        <>
        <TextField
          value={searchText}
          onChange={handleOnChange}
          id="standard-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
              disableUnderline: true,
              startAdornment: <InputAdornment position="start" ><span style={{fontWeight: 600, color: "black"}}>Tag: </span></InputAdornment>,
            }}
            variant="standard"
            placeholder="Search"
            />
        <Divider/>
        <Box sx={{overflowY: "scroll", height: "250px"}}>
          {suggestedUsers.isLoading ? "Loading..." : 
          <List>
            {suggestedUsers?.users.map(user => <CustomUserListItem user={user} isLink={isLink} onClick={onItemClicked}/>)}
          </List>
          }
        </Box>
          </>
    );
}

export default SearchUser;