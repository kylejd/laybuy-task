import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../stores/authContext";
import { CustomPage } from "./_app";

const Home: CustomPage = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOutClick = () => {
    logout();
    router.push("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="h2">
          Hello!
        </Typography>

        <Button
          onClick={handleSignOutClick}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

Home.requiresAuth = true;
Home.redirectUnauthenticatedTo = "/login";

export default Home;
