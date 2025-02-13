import bcrypt from "bcrypt";

const hashPassword = async (password) => {
    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const verifyPassword = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch ;
}


export { hashPassword, verifyPassword };