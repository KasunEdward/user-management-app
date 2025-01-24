import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useThemeContext } from "../../context/ThemeContext";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DarkMode, LightModeOutlined } from "@mui/icons-material";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  {
    name: "Dashboard",
    url: "/",
  },
  {
    name: "Users",
    url: "/users",
  },
];

const MenuBar: React.FC = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { mode, toggleMode } = useThemeContext();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const ModeHandler = (
    <Tooltip
    title={`Toggle ${mode === "light" ? "Dark" : "Light"} mode`}
    placement="bottom"
  >
    <IconButton onClick={toggleMode}>
      {mode === "light" ? (
        <DarkMode
          sx={{
            color: "blue",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
          }}
        />
      ) : (
        <LightModeOutlined />
      )}
    </IconButton>
  </Tooltip>
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item.name}
                onClick={() => {
                  navigate(item.url);
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {ModeHandler}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.background.default,
            color: theme.palette.primary.text.primary,
          })}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={(theme) => ({
              flexGrow: 1,
              color: theme.palette.primary.text.primary,
              fontWeight: 600,
            })}
          >
            User Management App
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {ModeHandler}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={(theme) => ({
            color: theme.palette.text.primary,
            "& .MuiButtonBase-root MuiIconButton-root": {
              color: theme.palette.text.primary,
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          })}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default MenuBar;
