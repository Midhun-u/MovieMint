// Function for storing data to local storage
export const addDataToLocalStorage = (name: string, data: string | object) => {

    if(typeof data === "object"){
        localStorage.setItem(name, JSON.stringify(data))
        return 
    }

    localStorage.setItem(name, data)

}

//Function for getting data from local storage
export const getDataFromLocalStorage = (name: string) => {

    const data = localStorage.getItem(name)

    if(!data) return null

    try {
        
        const obj = JSON.parse(data)
        return obj

    } catch (error) {
        return data
    }

}