import { useContext, useState, useEffect, useRef } from "react";
import { loginApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const errorTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const showError = (msg) => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMsg(msg);
    errorTimerRef.current = setTimeout(() => {
      setErrorMsg("");
    }, 4000);
  };

  const loginAction = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const resp = await loginApi({ username, password });

    if (resp?.token) {
      login(resp.token);
      navigate("/dashboard", { replace: true });
    } else if (resp?.error) {
      showError(resp.error.message || "Error en las credenciales");
    } else {
      showError("Ocurrió un error inesperado");
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '16px'}}>


      <span style={{position: 'absolute', top: '4%', left: '5%', fontSize: '72px', opacity: 0.06, transform: 'rotate(-15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '8%', left: '22%', fontSize: '42px', opacity: 0.05, transform: 'rotate(15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '3%', left: '38%', fontSize: '48px', opacity: 0.04, transform: 'rotate(-10deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '3%', left: '55%', fontSize: '50px', opacity: 0.05, transform: 'translateX(-50%) rotate(5deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '7%', right: '22%', fontSize: '54px', opacity: 0.06, transform: 'rotate(-20deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '5%', right: '6%', fontSize: '64px', opacity: 0.06, transform: 'rotate(12deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>


      <span style={{position: 'absolute', top: '25%', left: '8%', fontSize: '50px', opacity: 0.05, transform: 'rotate(-25deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '18%', left: '15%', fontSize: '35px', opacity: 0.04, transform: 'rotate(20deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '28%', left: '26%', fontSize: '38px', opacity: 0.04, transform: 'rotate(30deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '20%', right: '32%', fontSize: '42px', opacity: 0.04, transform: 'rotate(15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '26%', right: '25%', fontSize: '45px', opacity: 0.04, transform: 'rotate(-15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '24%', right: '9%', fontSize: '56px', opacity: 0.05, transform: 'rotate(25deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>


      <span style={{position: 'absolute', top: '46%', left: '3%', fontSize: '48px', opacity: 0.05, transform: 'rotate(10deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '40%', left: '20%', fontSize: '44px', opacity: 0.04, transform: 'rotate(-15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '52%', left: '25%', fontSize: '36px', opacity: 0.04, transform: 'rotate(25deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '38%', right: '18%', fontSize: '40px', opacity: 0.04, transform: 'rotate(-20deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '54%', right: '22%', fontSize: '46px', opacity: 0.05, transform: 'rotate(15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '45%', right: '4%', fontSize: '52px', opacity: 0.05, transform: 'rotate(-10deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>


      <span style={{position: 'absolute', top: '65%', left: '12%', fontSize: '60px', opacity: 0.06, transform: 'rotate(20deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '76%', left: '18%', fontSize: '45px', opacity: 0.05, transform: 'rotate(-10deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '60%', left: '28%', fontSize: '42px', opacity: 0.05, transform: 'rotate(-10deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '58%', right: '27%', fontSize: '40px', opacity: 0.05, transform: 'rotate(15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '74%', right: '20%', fontSize: '42px', opacity: 0.04, transform: 'rotate(30deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', top: '64%', right: '11%', fontSize: '48px', opacity: 0.06, transform: 'rotate(-15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>


      <span style={{position: 'absolute', bottom: '7%', left: '6%', fontSize: '64px', opacity: 0.06, transform: 'rotate(10deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', bottom: '14%', left: '22%', fontSize: '48px', opacity: 0.05, transform: 'rotate(-10deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', bottom: '4%', left: '38%', fontSize: '45px', opacity: 0.04, transform: 'rotate(15deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', bottom: '3%', left: '55%', fontSize: '55px', opacity: 0.05, transform: 'translateX(-50%) rotate(-5deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', bottom: '12%', right: '22%', fontSize: '52px', opacity: 0.05, transform: 'rotate(18deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>
      <span style={{position: 'absolute', bottom: '6%', right: '6%', fontSize: '72px', opacity: 0.06, transform: 'rotate(-12deg)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1}}>🐾</span>

      <div style={{backgroundColor: '#FFFFFF', borderRadius: '28px', padding: '48px 40px', width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1, boxShadow: '0 8px 48px rgba(232, 96, 60, 0.12)'}}>

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '36px'}}>
          <div style={{width: '72px', height: '72px', backgroundColor: '#E8603C', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
            <svg viewBox="0 0 24 24" style={{width: '36px', height: '36px', fill: 'white'}}>
              <ellipse cx="12" cy="17" rx="5" ry="4"/>
              <ellipse cx="5" cy="13" rx="2.5" ry="2"/>
              <ellipse cx="19" cy="13" rx="2.5" ry="2"/>
              <ellipse cx="8" cy="8" rx="2" ry="2.5"/>
              <ellipse cx="16" cy="8" rx="2" ry="2.5"/>
            </svg>
          </div>
          <h1 style={{fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 6px 0', textAlign: 'center'}}>Centro Adopción</h1>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0, textAlign: 'center'}}>Bienvenido de vuelta 🐶</p>
        </div>

        {errorMsg && (
          <div style={{marginBottom: '16px', padding: '12px 16px', backgroundColor: '#FFF5F5', border: '1.5px solid #FED7D7', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#E53E3E', textAlign: 'center'}}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={loginAction} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div>
            <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu rut"
              required
              style={{display: 'block', width: '100%', boxSizing: 'border-box', padding: '14px 16px', backgroundColor: '#F5F5F5', border: '1.5px solid #EEEEEE', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#1A1A1A', outline: 'none'}}
            />
          </div>
          <div>
            <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
              style={{display: 'block', width: '100%', boxSizing: 'border-box', padding: '14px 16px', backgroundColor: '#F5F5F5', border: '1.5px solid #EEEEEE', borderRadius: '14px', fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#1A1A1A', outline: 'none'}}
            />
          </div>
          <button
            type="submit"
            style={{width: '100%', padding: '16px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '14px', fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.02em', marginTop: '4px'}}
          >
            Entrar
          </button>
        </form>

        <p style={{fontFamily: 'Inter, sans-serif', textAlign: 'center', fontSize: '13px', color: '#CCCCCC', marginTop: '28px', marginBottom: 0}}>
          Todo por ellos —{' '}
          <span style={{color: '#E8603C', fontWeight: '500'}}>adopta con amor</span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;