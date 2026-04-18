import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ahiydmkzgufpquowybln.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaXlkbWt6Z3VmcHF1b3d5YmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MDgwMDUsImV4cCI6MjA5MjA4NDAwNX0.52s62Oyhn34ptCGai-9SqnrM1H17SjynrYM4ZsIG2Xc'

export const supabase = createClient(supabaseUrl, supabaseKey)
