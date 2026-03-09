import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h2>
          <p className="text-gray-600 mb-6">Sign in with Google to view your profile</p>
          <button
            onClick={() => loginWithRedirect({ connection: 'google-oauth2' })}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Login with Google
          </button>
          <Link to="/" className="block mt-4 text-blue-600 hover:underline text-sm">
            ← Back to Pokédex
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
        <div className="flex flex-col items-center gap-4">
          {user?.picture && (
            <img
              src={user.picture}
              alt={user.name}
              className="w-24 h-24 rounded-full"
            />
          )}
          <div className="text-center">
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Pokédex
          </Link>
        </div>
      </div>
    </main>
  );
}
