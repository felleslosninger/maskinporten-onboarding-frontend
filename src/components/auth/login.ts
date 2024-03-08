export const login = () => {
  const regId = "ansattporten";
  window.location.href = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/oauth2/authorization/${regId}`;
};

export const logout = async () => {
  window.location.href = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/logout`;
};
