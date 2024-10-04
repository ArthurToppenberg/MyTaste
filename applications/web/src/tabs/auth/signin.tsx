import React, { useContext } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext, singinResponse } from '@packages/authProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { signin } = useAuthContext();
  console.log('Auth Context:', signin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const response = await signin({
      email: email,
      password: password
    });

    if(response.message) {
      setError(response.message);
      return;
    }
  };

  return (
    <>
      <title>My Taste - Sign in</title>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="card p-4">
              <h1 className="text-center mb-4">My Taste</h1>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Sign In
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-block mt-2"
                onClick={() => router.push('/')}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-link btn-block mt-2"
                onClick={() => router.push('/auth/register')}
              >
                Don&apos;t have an account? Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;