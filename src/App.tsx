import { RouterProvider } from 'react-router-dom';
import { GetRouter } from './routes/router.tsx';

function App() {
  const router = GetRouter();
  return (
    <RouterProvider router={router} />
  )
}

export default App
