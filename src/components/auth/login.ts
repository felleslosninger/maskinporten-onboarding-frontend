export const login = () => {
    //@ts-ignore
    window.location.href = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/authenticate`;
}

export const logout = async () => {
    window.location.href = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/logout`;
}