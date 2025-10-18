import { useNavigate } from 'react-router';
import { UseAuthentication } from '../hooks/useAuthentication';

function HomePage() {
  const navigate = useNavigate();
  const authenticationService = UseAuthentication();

  function goToLoginPage() {
    navigate('/');
  }

  function handleLogout() {
    authenticationService.logout()
      .then(() => {
        goToLoginPage();
      })
      .catch(err => {
        console.error('Logout error:', err);
        
        goToLoginPage();
      });
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="text-3xl font-bold text-slate-500 mb-8">Welcome to this generic app!</div>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomePage;