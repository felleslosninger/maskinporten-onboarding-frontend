
export const login = () => {
    //@ts-ignore
    window.location.href = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/authenticate`;
}