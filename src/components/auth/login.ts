
export const login = () => {
    //@ts-ignore
    window.location.href = `${window.env.BASE_URL}/api/authenticate`;
}