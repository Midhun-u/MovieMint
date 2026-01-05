// Function for handling error
export const handleError = (fn: Function) => {

    return async (...arg: any[]) => {

        try {
          
            await fn(...arg)
            
        } catch (error: any) {

            console.error(error)
            return {success: false, errorMessage: error.message, error: error}

        }

    }

}