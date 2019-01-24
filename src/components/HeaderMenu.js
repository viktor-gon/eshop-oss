import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Link } from "react-router-dom";


const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {


    this.setState({ anchorEl: event.currentTarget });
  };



    handleCloseMenu1 = () => {
     //console.log('menu 1');
    this.setState({ anchorEl: null });
  };

    handleCloseMenu2 = () => {
     //console.log('menu 2');
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
            
            <MenuItem onClick={this.handleCloseMenu1}>
              <Link to='/eshop-oss'>View catalog</Link>
            </MenuItem>
            <MenuItem onClick={this.handleCloseMenu2}>
              <Link to='/additem'>Add item</Link>
            </MenuItem>            
            
        
        </Menu>
      </div>
    );
  }
}

export default LongMenu;