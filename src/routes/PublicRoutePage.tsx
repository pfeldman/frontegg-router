import { VFC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthRoutes, useAuthUser, AdminPortal, useLoginWithRedirect, useAuth } from '@frontegg/react'
import { ContextHolder } from '@frontegg/rest-api'
import logo from "../assets/logo.svg";
import fronteggLogo from "../frontegg/logo.svg";

const UnauthorizedButtons: VFC = () => {
  const navigate = useNavigate()
  const { loginUrl } = useAuthRoutes()
  const { baseUrl } = ContextHolder.getContext()

  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  const goToPrivateRouter = useCallback(() => {
    navigate('./private-route')
  }, [navigate])

  if (baseUrl === 'https://sub-domain.frontegg.com') {
    return <p>
      Edit <code>src/FronteggOptions/index.ts {'{ baseUrl: "" }'}</code> to connect to your application
    </p>
  }

  return <>
    <h4>Hello there, press "Go to login" button for authentication</h4>
    <div className="App-Buttons">
      <button className="App-button" onClick={() => loginWithRedirect()}>Go to login</button>
      <button className="App-button" onClick={goToPrivateRouter}>Test private route</button>
    </div>
    <br/>
    <br/>
  </>
}

const AuthorizedButtons: VFC = () => {
  const navigate = useNavigate()
  const user = useAuthUser()

  const openAdminPortal = useCallback(() => {
    AdminPortal.show()
  }, [])

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const goToPrivateRouter = useCallback(() => {
    navigate('./private-route')
  }, [navigate])


  return <>
    <h4>Hello, {user.name}</h4>
    <div className="App-Buttons">
      <button className="App-button" data-test-id="open-admin-portal-btn" onClick={openAdminPortal}>Open Admin Portal</button>
      <button className="App-button" onClick={goToPrivateRouter}>Go to private route</button>
      <button className="App-button" onClick={() => logout()}>Logout</button>
    </div>

    <br/>
    <br/>
    <p>
      Open <a
      className="App-link"
      href="https://portal.frontegg.com/configure/authentication/builder/design"
      target="_blank"
      rel="noopener noreferrer"
    >LoginBox Builder</a> to customize you login screens</p>
  </>
}

const PublicRoutePage: VFC = () => {
  const { user, isAuthenticated } = useAuth();
  console.log("PUBLIC");

  return <div className="App">
    <header className="App-header">

      <div className="App-logo-container">
        <img src={logo} className="App-logo" alt="logo"/>
        <span className="App-logo-separator">+</span>
        <img src={fronteggLogo} className="Frontegg-logo" alt="logo"/>
      </div>

      {isAuthenticated ? <AuthorizedButtons/> : <UnauthorizedButtons/>}
      <a
        className="App-link"
        href="https://docs.frontegg.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn how to use Frontegg
      </a>
    </header>
  </div>
}


export default PublicRoutePage;
