import bcrypt from 'bcrypt';
const comprobarPassword = async(password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}

const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export {
    comprobarPassword,
    generarId
}