import React, {useEffect} from 'react';
import {useState} from 'react';
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

function Login() {
    /* Hooks */
    const router = useRouter();

    /* State */
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const [error, setError] = useState({
        email: '',
        password: '',
        general: ''
    })
    const [canSubmit, setCanSubmit] = useState(false);

    /* Validation */
    const validateEmail = (email) => {
        let _error = '';
        if (email === undefined || email === '') {
            _error = 'El campo email es requerido';
        } else if (!email.includes('@')) {
            _error = 'El campo email debe contener un @';
        } else if (!email.includes('.')) {
            _error = 'El campo email debe contener un dominio (e.g. .com, .net, .org)';
        } else if (email.length < 5) {
            _error = 'El campo email debe contener al menos 5 caracteres';
        }

        if (_error) {
            setError({
                ...error,
                email: _error
            })
        } else {
            setError({
                ...error,
                email: ''
            })
        }
    }
    const validatePassword = (password) => {
        let _error = '';
        if (password === undefined || password === '') {
            _error = 'El campo password es requerido';
        } else if (password.length < 4) {
            _error = 'El campo password debe contener al menos 4 caracteres';
        }

        if (_error) {
            setError({
                ...error,
                password: _error
            })
        } else {
            setError({
                ...error,
                password: ''
            })
        }
    }

    /* Event Handlers */
    const handleOnBlur = (e) => {
        const {name, value} = e.target;

        if (name === 'email') validateEmail(value);
        else if (name === 'password') validatePassword(value);
    }
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        const newPayload = {...payload, [name]: value};
        setPayload(newPayload)
    }
    const handleToggle = () => {
        setPayload({
            ...payload,
            rememberMe: !payload.rememberMe
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError({
            email: '',
            password: '',
            general: ''
        })

        validateEmail(payload.email);
        validatePassword(payload.password);

        return await signIn("credentials", {
            redirect: false,
            email: payload.email,
            password: payload.password,
        }).then(({ok, error}) => {
            if (ok) {
                router.push('/')
            } else {
                console.log(error);
                setError({
                    ...error,
                    general: error === "CredentialsSignin" ? "Credenciales incorrectas" : "Error desconocido: " + error
                })
                setPayload({
                    ...payload,
                    password: ''
                });
            }
        })

    }

    /* Effects */
    useEffect(() => {
        if (payload.email !== '' && payload.password !== '' && error.email === '' && error.password === '') {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [error, payload]);

    /* Render */
    return (
        <main id="login" className={"bg-gray-100 w-full"}>
            <div>

            </div>
            <form id={"login-form-container"}
                  className={"bg-white border-2 border-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-14 pt-16 pb-14 flex flex-col justify-between"}>
                <h1 className={"text-center font-bold text-5xl"}>LOG IN</h1>
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               name="email"
                               id="email"
                               placeholder="admin@gmail.com"
                               onChange={handleOnChange}
                               onBlur={handleOnBlur} />
                        <p className={"text-xs text-red-600"}>{error.email}</p>
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"
                               name="password"
                               id="password"
                               placeholder="Password"
                               onChange={handleOnChange}
                               onBlur={handleOnBlur} />
                        <p className={"text-xs text-red-600"}>{error.password}</p>
                    </div>
                </div>
                <div className={"w-full gap-y-40 flex-col"}>
                    <div className={"flex-row"}>
                        <input type="checkbox" name="rememberMe" id="rememberMe" onChange={handleToggle} />
                        <label htmlFor="rememberMe">Recuerdame por 7 días</label>
                    </div>
                    <div>
                        <p className={"text-xs text-red-600 text-right"}>{error.general}</p>
                        <button className={"w-full flex-row my-5"}
                                type="submit"
                                onClick={handleSubmit}
                                disabled={!canSubmit}>
                            <p>Entrar</p>
                        </button>
                    </div>
                    <aside>
                        <p className={"text-gray-400 text-sm"}>* Si olvido su contraseña, contacte al equipo de
                                                               desarrollo para restablecerla</p>
                    </aside>
                </div>
            </form>
            <div>

            </div>
        </main>
    );
}

export default Login;