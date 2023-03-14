import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const encryptPass = (password: string): string => {
    const salt: string = genSaltSync(15);
    const encryptedPass: string =  hashSync(password, salt);
    return encryptedPass;
}

export const decrypt = (plainPass: string, encryptedPass: string): boolean => {
    return compareSync(plainPass, encryptedPass);
}