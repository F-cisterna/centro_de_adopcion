import { useContext, useState } from "react";
import { loginApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginAction = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const resp = await loginApi({ username, password });

    if (resp?.token) {
      login(resp.token);
      navigate("/dashboard", { replace: true });
    } else if (resp?.error) {
      // Assuming ErrorInfo structure has 'message'
      setErrorMsg(resp.error.message || "Error en las credenciales");
    } else {
      setErrorMsg("Ocurrió un error inesperado");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
        {errorMsg && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700 text-sm text-center">
            {errorMsg}
          </div>
        )}
        <form onSubmit={loginAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              className="mt-1 w-full rounded border-gray-300 border p-2 focus:border-blue-500 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="mt-1 w-full rounded border-gray-300 border p-2 focus:border-blue-500 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;