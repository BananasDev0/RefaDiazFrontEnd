import { createClient } from '@supabase/supabase-js'

// Leer variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Validar que las variables de entorno estén definidas
if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL no está definida en las variables de entorno')
}

if (!supabaseKey) {
  throw new Error('VITE_SUPABASE_KEY no está definida en las variables de entorno')
}

// Crear y exportar la instancia de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase 