import fs from 'fs/promises'

// Function for reading file
export const readFileFromDisk = (filePath: string) => {

    return fs.readFile(filePath)

}

// Function for deleting file
export const deleteFileFromDisk = async (filePath: string) => {

    await fs.unlink(filePath)

}