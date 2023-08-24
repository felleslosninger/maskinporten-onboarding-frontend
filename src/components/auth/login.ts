export const login = (admin: boolean) => {
    const regId = admin ? "ansattporten-2480" : "ansattporten-5613";
    window.location.href = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/oauth2/authorization/${regId}`;
}

export const logout = async () => {
    window.location.href = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/logout`;
}