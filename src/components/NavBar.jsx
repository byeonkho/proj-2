import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

const NavBar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: "flex", justifyContent: "left" }}>
                <NavLink to="/" style={{ marginRight: "20px" }}>
                    <Typography variant="h7" color="white">
                        Home
                    </Typography>
                </NavLink>
                <NavLink to="/about" style={{ marginLeft: "20px" }}>
                    <Typography variant="h7" color="white">
                        About
                    </Typography>
                </NavLink>
               
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
