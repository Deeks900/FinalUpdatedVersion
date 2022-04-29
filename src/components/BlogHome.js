import React, { useEffect, useState,useContext } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Stack from '@mui/material/Stack';
import { getStorage, ref, deleteObject } from "firebase/storage";
import "./blog-home.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import nexumLogo from "../assets/nexumLogo.jpg";
const pages = ["Home", "Create Post"];


function BlogHome({userData}) {
  // Navbar
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login");
    // console.log("done");
  };
  // Navbar

  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id, url) => {
    const postDoc = doc(db, "posts", id);
    console.log(url);
    const postRef = ref(storage, url);
    deleteObject(postRef).then(()=>{
      console.log("I'm easy");
    }).catch((error)=>{
      console.log("error occured")
    })
    // await deleteObject(url);
    await deleteDoc(postDoc);
    /*window.location.reload();*/
  };
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  },[deletePost]);

  return (
    <div className="homePage">
      {/* Navbar */}
      <AppBar
      position="static"
      className="navbar-container"
      style={{ backgroundColor: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
          <Link to ="/">
          <img
              src={nexumLogo}
              alt="nexum"
              style={{ height: "40px", width: "150px" }}
            />
          </Link>
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img
              src={nexumLogo}
              alt="nexum"
              style={{ height: "40px", width: "150px" }}
            />
          </Typography>

          <Box
            mr={2}
            sx={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link to ="/createpost">
            <Button
              variant="contained"
              color="success"
              style={{ height: "50px" }}
            >
              Create Post
            </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userData?.photoUrl}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
              
              <Link to="/profile" style={{ textDecoration: "none", color: "black"}}>
                  <Typography textAlign="center">Profile</Typography>
              </Link>
                </MenuItem>

                <MenuItem key="Blogs" onClick={handleCloseUserMenu}>
              
              <Link to="/BlogHome" style={{ textDecoration: "none", color: "black"}}>
                  <Typography textAlign="center">Blogs Section</Typography>
              </Link>
                </MenuItem>

                <MenuItem key="Notes" onClick={handleCloseUserMenu}>
              
              <Link to="/Notes" style={{ textDecoration: "none", color: "black"}}>
                  <Typography textAlign="center">Notes Section</Typography>
              </Link>
                </MenuItem>

              <MenuItem 
              key={"Logout"} 
              onClick={()=>{
                handleLogout();
                handleCloseUserMenu();
              }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      {/* Navbar */}
      <Stack direction="column" spacing={3}>
      {postLists
        .filter((post) => post.author !== undefined)
        .map((post) => {
          return (
            <div className="post" key={post.id}>
              <Stack direction="column" spacing={2}>
              <div className="postHeader">
                <div className="title">
                  <Link to={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                </div>
                <div className="deletePost">
                  {post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id, post.cover.url);
                      }}
                    >
                      {" "}
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
              <div className="subTitle">
                  <p>{post.subTitle}</p>
              </div>
              {/* <div className="postTextContainer"> {post.postText} </div> */}
              <h3>@{post.author.name}</h3>
              </Stack>
            </div>
          );
        })}
         </Stack>
    </div>
  );
}

export default BlogHome;
