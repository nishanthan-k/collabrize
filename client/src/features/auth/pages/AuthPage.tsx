import { apiUrl } from "../../../global/constants/apiUrls";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AuthPage() {


  const handleOAuth = (provider: string) => {
    window.location.href = `${API_BASE_URL}${apiUrl.auth.oauth}${provider}`
  }

  return (
    <section>
      <button onClick={() => handleOAuth('github')}>Github</button>
      <button onClick={() => handleOAuth('google')}>Google</button>
    </section>
  )
}

export default AuthPage
