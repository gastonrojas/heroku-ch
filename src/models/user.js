import bcryptjs from 'bcryptjs';

export async function crearUsuario({ username, password}) {
    if (!username) throw new Error(`MISSING_ARGS: el campo 'username' es obligatorio`)
    if (!password) throw new Error(`MISSING_ARGS: el campo 'password' es obligatorio`)

    const encryptedPassword = await bcryptjs.hash(password, 8)
    if (!encryptedPassword) throw new Error('No se pudo guardar los datos, intente nuevamente')
    return {
        username,
        password: encryptedPassword
    }
}

