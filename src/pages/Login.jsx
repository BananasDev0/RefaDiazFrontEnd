import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/Firebase/auth";
import Logo from "../assets/Logo_RD.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // RegEx simple para validar emails.

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "error",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Restablecer la alerta
    setAlert({ ...alert, show: false });

    if (!email || !password) {
      setAlert({
        show: true,
        message: "Favor de introducir los campos requeridos",
        severity: "error",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      setAlert({
        show: true,
        message: "Introduce un Email valido",
        severity: "error",
      });
      setError((prevError) => ({
        ...prevError,
        email: "Email no válido",
      }));
      return;
    }
    // Si llegamos aquí, ambos campos están llenos y el email es válido.
    ///console.log({ email, password });
    //navigate("/home");

   try{
    const validate = await signIn(email, password);
    if (validate) {
      navigate("/home");
    } else {
      setAlert({ show: true, message: "Usuario no encontrado" });
    }
   }catch(error) {
    console.log(error);
    setAlert({ show: true, message: "Usuario o Contraseña incorrecta",severity: "error" });
   }
    
    
  };

  return (
    <Container
      component="main"
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img
          src={Logo}
          alt="Logotipo Refaccionaria Diaz"
          style={{ width: 100, height: "auto", marginBottom: 20 }}
        />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error.password}
            helperText={error.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          {alert.show && (
            <Stack sx={{ width: "100%", mb: 2 }}>
              <Alert severity={alert.severity}>{alert.message}</Alert>
            </Stack>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
