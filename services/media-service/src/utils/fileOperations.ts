import fs from 'fs/promises'

// Function for reading file
export const readFileFromDisk = async (filePath: string) => {

    return await fs.readFile(filePath)

}

// Function for deleting file
export const deleteFileFromDisk = async (filePath: string) => {

    await fs.unlink(filePath)

}