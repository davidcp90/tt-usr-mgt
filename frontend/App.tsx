import Navbar from "./components/Navbar";
import UserManagement from "./pages/UserManagement";

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <UserManagement />
    </div>
  );
}

export default App;