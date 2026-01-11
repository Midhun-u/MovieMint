import fs from 'fs'

// Function for reading file
export const readFileFromDisk = (filePath: string) => {

    return fs.readFileSync(filePath)

}

// Function for deleting file
export const deleteFileFromDisk = (filePath: string) => {

    fs.unlink(filePath, (error) => {

        if(error) console.log(error.message)

    })

}