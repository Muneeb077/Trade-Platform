import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { BASE_URL, API_PATHS } from '../../utils/apiPaths';

const GoogleButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full mt-3">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}${API_PATHS.AUTH.GOOGLE_LOGIN}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: credentialResponse.credential }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Google login failed');
            onSuccess?.(data); // { id, user, token }
          } catch (err) {
            onError?.(err);
          } finally {
            setLoading(false);
          }
        }}
        onError={() => {
          onError?.(new Error('Google sign-in was cancelled or failed.'));
        }}
        useOneTap={false} // set true if you want One Tap
      />
      {loading && <p className="text-xs text-slate-600 mt-1">Connecting…</p>}
    </div>
  );
}

export default GoogleButton;