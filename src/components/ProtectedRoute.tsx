import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

interface ProtectedRoute2 {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}
    export default function ProtectedRoute({ component: Component,  ...rest}: ProtectedRoute2) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
        console.log("ProtectedRoute : useEffect");
        const checkAuth = async () => {

            //Tengo que comprobar si tengo token para saber si estoy logado (si hay token logged es true, si no es false; todo eso lo resuelve el operador !!)
            const logged = !!localStorage.getItem('token');

            console.log("ProtectedRoute : logged : ", logged);
            setIsAuthenticated(logged);

            setLoading(false);
        };
        checkAuth();
    }, []);
    return (
        <Route
        {...rest}
        render={(props) => {
            if (loading) {
            return <div>Cargando...</div>;
            }
            return isAuthenticated ? (
            <Component {...props} />
            ) : (
            <Redirect to="/login" />
            );
        }}
        />
    );
}
