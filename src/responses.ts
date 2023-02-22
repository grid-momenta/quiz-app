/* eslint-disable prettier/prettier */
export const successRes = (data) => {
    return {
        success: true,
        errors: null,
        data,
    }
}

export const errorRes = (errors) => {
    return {
        success: false,
        errors,
        data: null,
    };
};