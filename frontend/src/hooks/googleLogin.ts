const handleGoogleLogin = () => {
  const popup = window.open(`${import.meta.env.VITE_API_URL}/auth/google/popup`, '_blank', 'width=500,height=600');

  const receiveMessage = (event: MessageEvent) => {
    if (event.origin !== import.meta.env.VITE_API_URL) return;

    const user = event.data;
    if (user && user.email) {
      // Valfritt: Spara användare direkt om du vill
      // Annars gör en fetch till /auth/me som vanligt
      window.removeEventListener('message', receiveMessage);
      window.location.href = '/?loggedIn=true'; // trigger din AuthProvider
    }
  };

  window.addEventListener('message', receiveMessage);
};
