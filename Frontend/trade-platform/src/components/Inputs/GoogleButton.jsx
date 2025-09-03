import { useState } from 'react';
// import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  // const login = useGoogleLogin({
  //   flow: 'implicit', // or 'auth-code' if you want a server-side code exchange
  //   scope: 'openid email profile',
  //   onSuccess: async (tokenResponse) => {
  //     setLoading(false);
  //     // tokenResponse contains access_token, expires_in, etc.
  //     // If you need id_token (JWT) for backend verification, switch to the "GoogleLogin" component,
  //     // or use the 'auth-code' flow server-side. See note below.
  //     onSuccess?.(tokenResponse);
  //   },
  //   onError: (err) => {
  //     setLoading(false);
  //     onError?.(err);
  //   },
  //   onNonOAuthError: () => setLoading(false),
  //   prompt: 'select_account',
  // });

  return (
    <button
      type="button"
      onClick={() => { setLoading(true); login(); }}
      className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 transition disabled:opacity-60"
      disabled={loading}
    >
      <FcGoogle size={20} />
      {loading ? 'Connecting…' : 'Continue with Google'}
    </button>
  );
}

export default GoogleButton;