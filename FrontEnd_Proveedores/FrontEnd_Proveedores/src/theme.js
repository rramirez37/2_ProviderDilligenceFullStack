import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D4A214",
      contrastText: "#1A1A1A",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
  },

  components: {
    MuiButton: {
      //BUTTONS
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          fontWeight: "bold",
          marginTop: "16px"
        },
      },
    },
    MuiTextField: {
      //TEXTFIELDS
      defaultProps: {
        variant: "outlined",
        margin: "normal",
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
        },
      },
    },
  },
});
