export default function LoginPage() {

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
            <button onClick={handleLogin}>
            Logga in med google
            </button>
    )
};