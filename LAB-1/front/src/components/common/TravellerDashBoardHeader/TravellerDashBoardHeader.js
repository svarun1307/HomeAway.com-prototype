import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/dashboards.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../AppSettings/AppSettings';
//import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxHeight: '100px'
    },
    appFrame: {
        height: 430,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        overflow : 'hidden',
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
    'rightToolbar': {
        marginLeft: 'auto',
        marginRight: -12,
    },
    'toolbarButtons' : {
        minWidth : '15px',
        height : '100%',
        whiteSpace : 'nowrap',
        paddingLeft : '30px',
        paddingRight : '30px',
        textTransform : 'capitalize'
    }
});

class TravellerDashBoardHeader extends React.Component {
    state = {
        open: false,
        anchor: 'left',
        anchorEl: null,
        anchorEl2 : null,
        left: false,
        checkLogin : false
    };

    constructor(props)
    {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        if(cookie.load('user') && cookie.load('trcker') && cookie.load('login-type'))
        {
            if(cookie.load('login-type')!='TRAVELLER')
            {
                this.props.history.push({
                    pathname : "/traveller-login"
                })
            }

        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClick2 = event => {
        this.setState({ anchorEl2: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClose2 = () => {
        this.setState({ anchorEl2: null });
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    handleLogout()
    {
        let m = window.confirm("Are you sure you want to logout?");
        if(m)
        {
            let _t = this;
            /*************SUBMITTING FORM TO THE SERVER***************** */
            axios.defaults.withCredentials = true;
            axios({
                method: 'POST',
                url: BASE_URL + '/logoutUser'
                })
            .then(function (response) {
                if(response.status == 200)
                {
                    if(response.data == '-1')
                    {
                        alert("There was an error while saving the details. Please try again.");
                        document.location.reload();
                    }
                    else if(response.data == '+1')
                    {                    
                        _t.setState({
                            checkLogin : true
                        })
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
    }



    render() {
        console.log(cookie.load('trcker'));



        let shouldRedirect = null;
        let userTypedMenu = null;
        if(!cookie.load('trcker') || !cookie.load('isLogged'))
        {
            console.log("yes");
            shouldRedirect = ( <Redirect to="/traveller-login" /> );
        }
        else 
        {
            console.log("no");
        }


        if(cookie.load('login-type')=='SELLER')
        {
            userTypedMenu = 'SELLER';
        }
        else if(cookie.load('login-type')=='TRAVELLER')
        {
            userTypedMenu = 'TRAVELLER';
        }


        console.log(shouldRedirect);

        const { classes, theme } = this.props;
        const { anchor, open } = this.state;
        const { anchorEl,anchorEl2 } = this.state;
        const drawer = (
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                >   
                <br/>
                    <List component="nav">
                        <ListItem button>
                             
                            <Typography variant="title" color="inherit" noWrap className="fWClass">
                               <Link to="/traveller/dashboard" > <img src={require('../../../images/logo-login.svg')} /></Link>
                               <hr/>
                            </Typography>
                        </ListItem>
                        
                        <ListItem button>  
                            <Link className="redirector" to="/traveller/dashboard"><i className="material-icons">home</i></Link><span className="leftMenuItem"><Link className="redirector" to="/traveller/dashboard">Dashboard</Link></span>
                        </ListItem>
                        {
                        userTypedMenu == 'SELLER' ? 
                        <ListItem button>  
                            <Link className="redirector" to="/seller/add-property"><i className="material-icons">add_circle_outline</i></Link><span className="leftMenuItem"><Link className="redirector" to="/seller/add-property">Add Property</Link></span>
                        </ListItem> : null
                        }
                         <ListItem button>  
                            <Link className="redirector" to="/traveller/bookings"><i className="material-icons">flash_on</i></Link><span className="leftMenuItem"><Link className="redirector" to="/traveller/bookings">My Bookings</Link></span>
                        </ListItem>
                        <ListItem button>  
                            <Link className="redirector" to="/traveller/user-profile"><i className="material-icons">person</i></Link><span className="leftMenuItem"><Link className="redirector" to="/traveller/user-profile">My Profile</Link></span>
                        </ListItem>

                        <ListItem button onClick={this.handleLogout}>  
                            <i className="material-icons"  >navigate_next</i><span className="leftMenuItem ex1"  >Logout</span>
                        </ListItem>

                            

                    </List>
                </div>
            </Drawer>
        );

        let before = null;
        let after = null;

        if (anchor === 'left') {
            before = drawer;
        } else {
            after = drawer;
        }

        return (
            <div className={classes.root}>
                {
                    shouldRedirect
                }
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-${anchor}`]]: open,
                        })}
                        style={{ backgroundColor: '#FFFFFF', color: '#000' }}
                        position="static"
                    >
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.toggleDrawer('left', true)}
                                className={classNames(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap className="fWClass">
                               <Link to="/seller/dashboard" > <img src={require('../../../images/logo-login.svg')} /></Link>
                            </Typography>
                           
                            
                            <Button
                                aria-owns={anchorEl ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                className={classes.toolbarButtons}
                                data-btn="menub"
                            >
                                <i className="material-icons"><i className="material-icons">person</i></i>&nbsp;&nbsp; My Account&nbsp;<i className="material-icons">expand_more</i>
                            </Button>
                            <Button
                                aria-owns={anchorEl2 ? 'simple-menu2' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick2}
                                className={classes.toolbarButtons}
                                data-btn="menub"
                            >
                               <i className="material-icons">notifications</i>
                            </Button>

                            <Button
                                
                                onClick={this.handleLogout}
                                className={classes.toolbarButtons}
                                
                            >
                               <i className="material-icons">
power_settings_new
</i>
                            </Button>
                            
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                               <MenuItem onClick={this.handleClose}> <Link className="redirector" to="/traveller/user-profile">Profile </Link></MenuItem>
                            {
                                userTypedMenu == 'SELLER' ? <MenuItem onClick={this.handleClose}><Link className="redirector" to="/seller/add-property">Add New Property</Link> </MenuItem> : null
                            }
                            {
                                <MenuItem onClick={this.handleClose}><Link className="redirector" to="/traveller/bookings">My Bookings</Link> </MenuItem> 
                            }  
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                
                            </Menu>

                             <Menu
                                id="simple-menu2"
                                anchorEl={anchorEl2}
                                open={Boolean(anchorEl2)}
                                onClose={this.handleClose2}
                            >
                                <MenuItem onClick={this.handleClose2}>No New notifications</MenuItem>
                            </Menu>


                        </Toolbar>

                    </AppBar>
                    {before}

                    {after}
                </div>
            </div>
        );
    }
}

TravellerDashBoardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

//export default withStyles(styles, { withTheme: true })(SellerDashBoardHeader);

export default withStyles(styles, { withTheme: true })(TravellerDashBoardHeader);

//export default withStyles(styles)(SellerDashBoardHeader);

//export default SellerDashBoardHeader;