import {createClient} from '@supabase/supabase-js'
import { envVariables } from '../utils/envVariables.js'

// Supabase client
export const supabase = createClient(envVariables.SUPABASE_PROJECT_URL, envVariables.SUPABASE_API_KEY)