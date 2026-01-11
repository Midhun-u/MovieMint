import bcrypt from 'bcrypt'

// Function for hashing password
export const hashPassword = async (password: string): Promise<string> => {

    const salt = await bcrypt.genSalt(5) // Generating salt
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword

}