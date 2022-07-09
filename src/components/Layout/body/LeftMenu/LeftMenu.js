import * as React from 'react';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  
} from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import StorageIcon from '@mui/icons-material/Storage';
import ExploreIcon from '@mui/icons-material/Explore';
import SourceIcon from '@mui/icons-material/Source';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import './LeftMenu.css';

function LeftMenu() {
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  return (
    <aside className={"opened drawer"}>
    <List
      sx={{ width: '100%', maxWidth: 360}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Database Connection" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}  component="a" href="dbConnectionListView" >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
             <ListItemText primary="List View" />
 
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component="a" href="dbConnectionListView">
            <ListItemIcon>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText primary="Details View" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick1}>
        <ListItemIcon>
          <DataUsageIcon />
        </ListItemIcon>
        <ListItemText primary="Data Model" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} component="a" href="dmlistview" >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="List View" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component="a" href="dmlistview" >
            <ListItemIcon>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText primary="Details View" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <SourceIcon />
        </ListItemIcon>
        <ListItemText primary="Data Source" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} component="a" href="DSListView" >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="List View"/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component="a" href="DSListView">
            <ListItemIcon>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText primary="Details View" />
          </ListItemButton>
        </List>
      </Collapse>
      
      <ListItemButton onClick={handleClick3}>
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary="Explorer" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 4 }} component="a" href="explorer">
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="List View" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component="a" href="explorer">
            <ListItemIcon>
              <GridViewIcon />
            </ListItemIcon>
            <ListItemText primary="Details View" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </aside>
  );
}

export default LeftMenu;