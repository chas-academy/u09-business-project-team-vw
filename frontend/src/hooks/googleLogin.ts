export const handleGoogleLogin = () => {
  const receiveMessage = (event: MessageEvent) => {
    if (event.origin !== import.meta.env.VITE_API_URL) return;

    const user = event.data;
    if (user && user.email) {
      window.removeEventListener('message', receiveMessage);
      window.location.href = '/?loggedIn=true';
    }
  };

  window.addEventListener('message', receiveMessage);

  window.open(`${import.meta.env.VITE_API_URL}/auth/google/popup`, '_blank', 'width=500,height=600');
};
