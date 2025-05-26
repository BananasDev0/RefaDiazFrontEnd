import { useState } from 'react'
import { 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Box, 
  Paper,
  Stack
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

function App() {
  const [count, setCount] = useState(0)
  const [textValue, setTextValue] = useState('')
  const theme = useTheme()

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          color="primary"
          textAlign="center"
        >
          Refaccionaria Díaz
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          textAlign="center" 
          gutterBottom
        >
          Tema de MUI Configurado
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Demostración de Componentes
          </Typography>
          
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="body1" gutterBottom>
                Contador: {count}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => setCount(count + 1)}
                >
                  Incrementar
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => setCount(count - 1)}
                >
                  Decrementar
                </Button>
                <Button 
                  variant="text"
                  onClick={() => setCount(0)}
                >
                  Resetear
                </Button>
              </Stack>
            </Box>

            <TextField
              label="Campo de texto de ejemplo"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              fullWidth
              helperText="Este TextField usa la configuración por defecto 'outlined'"
            />

            <Box sx={{ p: 2, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Este contenedor usa el color de fondo por defecto: {theme.palette.background.default}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Paleta de Colores Configurada:
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              • Primary (azulAccion): {theme.palette.primary.main}
            </Typography>
            <Typography variant="body2">
              • Secondary (rojoPrincipal): {theme.palette.secondary.main}
            </Typography>
            <Typography variant="body2">
              • Background Default (grisClaroFondo): {theme.palette.background.default}
            </Typography>
            <Typography variant="body2">
              • Background Paper (blancoPuro): {theme.palette.background.paper}
            </Typography>
            <Typography variant="body2">
              • Text Primary (grisTextoPrincipal): {theme.palette.text.primary}
            </Typography>
            <Typography variant="body2">
              • Text Secondary (grisTextoSecundario): {theme.palette.text.secondary}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default App
