// Function for handling error
export const handleError = <Type extends (...args: any[]) => any>(fn: Type) => {

    return async (...arg: Parameters<Type>) => {

        try {
          
            return await fn(...arg)
            
        } catch (error: any) {

            console.log(error)
            return {success: false, error: error.message}

        }

    }

}