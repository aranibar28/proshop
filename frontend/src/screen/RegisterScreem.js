import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message, Loader, FormContainer } from "../components";
import { register } from "../actions/userActions";

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h2 className="text-2xl font-bold mb-4">Registrar</h2>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <form onSubmit={submitHandler}>
        <div id="name" className="mb-2">
          <label className="block text-md mb-2">Nombre</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="text"
            placeholder="Ingresar nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div id="email" className="mb-2">
          <label className="block text-md mb-2">Email</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="email"
            placeholder="Ingresar email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div id="password">
          <label className="block text-md mb-2">Password</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="password"
            placeholder="Ingresar password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div id="confirmPassword">
          <label className="block text-md mb-2">Confirmar Password</label>
          <input
            className="px-4 mb-2 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="password"
            placeholder="Confirmar password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <button type="submit" className="btn btn-success">
          Registrar
        </button>
      </form>

      <div className="py-3">
        <div>
          Tienes una cuenta?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};
