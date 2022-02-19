import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message, Loader, FormContainer } from "../components";
import { login } from "../actions/userActions";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}

      <form onSubmit={submitHandler}>
        <div id="email" className="mb-2">
          <label className="block text-md mb-2">Email</label>
          <input
            className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
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
            className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
            type="password"
            placeholder="Ingresar password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <button type="submit" variant="primary" className="btn btn-success">
          Ingresar
        </button>

        <div className="flex space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100 cursor-pointer">
          <img className="h-5" src="https://i.imgur.com/arC60SB.png" alt="" />
          <button disabled>Inicia sesión con Google</button>
        </div>
      </form>

      <div className="py-3">
        <div>
          Aun no estas registrado?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="text-blue-600"
          >
            Registrar
          </Link>
        </div>
      </div>
    </FormContainer>
  );
}
