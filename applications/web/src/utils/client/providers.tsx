import { NextUIProvider } from '@nextui-org/react'
import { ApiProvider } from '@packages/apiCommunicator';
import { AuthProvider } from '@packages/authProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiProvider apiUrl="/api">
      <AuthProvider
        saveToken={(token) => {
          localStorage.setItem('token', token);
        }}
        removeToken={() => {
          localStorage.removeItem('token');
        }}
        getToken={() => {
          return localStorage.getItem('token');
        }}
      >
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </AuthProvider>
    </ApiProvider>
  )
}

export default Providers;