import { NextUIProvider } from '@nextui-org/react'
import { ApiProvider } from '@packages/apiCommunicator';
import { AuthProvider } from '@packages/authProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
      <ApiProvider apiUrl="/api">
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </ApiProvider>
    </AuthProvider>
  )
}

export default Providers;