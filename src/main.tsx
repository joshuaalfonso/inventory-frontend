import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './lib/reactQuery.ts'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
     <Provider>
        <App />
     </Provider>
   </QueryClientProvider>
  </StrictMode>,
)
