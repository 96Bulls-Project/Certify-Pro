import React from 'react';

function Login() {
    return (
        <main id="login" className={"bg-gray-100 w-full"}>
            <div>

            </div>
            <div id={"login-form-container"}
                 className={"bg-white border-2 border-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-14 pt-16 pb-14 flex flex-col justify-between"}>
                <h1 className={"text-center font-bold text-5xl"}>LOG IN</h1>
                <div>
                    <div>
                        <label htmlFor="email">Usuario</label>
                        <input type="email" name="email" id="email" placeholder="admin@gmail.com" />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" id="password" placeholder="Password" />
                    </div>
                </div>
                <div className={"w-full gap-y-40 flex-col"}>
                    <div className={"flex-row"}>
                        <input type="checkbox" name="remember-me" id="remember-me"/>
                        <label htmlFor="remember-me">Recuerdame por 7 días</label>
                    </div>
                    <button className={"w-full flex-row my-5"} type="submit">
                        <p>Entrar</p></button>
                    <aside>
                        <p className={"text-gray-400 text-sm"}>* Si olvido su contraseña, contacte al equipo de
                                                               desarrollo para restablecerla</p>
                    </aside>
                </div>
            </div>
            <div>

            </div>
        </main>
    );
}

export default Login;