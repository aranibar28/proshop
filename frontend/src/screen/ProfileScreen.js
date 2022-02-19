import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Message, Loader } from "../components";
import { getUserDetails } from "../actions/userActions";

export function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      console.log("UPDATE....");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <form onSubmit={submitHandler}>
          <div id="name">
            <label className="block text-md mb-2">Nombre</label>
            <input
              className="px-4 mb-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="name"
              placeholder="Ingresar nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div id="email">
            <label className="block text-md mb-2">Email</label>
            <input
              className="px-4 mb-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="email"
              placeholder="Ingresar email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div id="password">
            <label className="block text-md mb-2">Password</label>
            <input
              className="px-4 mb-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="password"
              placeholder="Ingresar password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div id="confirmPassword">
            <label className="block text-md mb-2">Confirmar Password</label>
            <input
              className="px-4 mb-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              type="password"
              placeholder="Confirmar password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>

          <button type="submit" className="btn btn-success">
            Actualizar
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Mis Pedidos</h2>
      </div>
    </div>
  );
}
