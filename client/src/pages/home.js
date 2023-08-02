import MetaMask from "../models/metamask";

export default function Home() {
  return (
    <div className="center-content">
      <div className="container">
        <h1>Flex-Auth</h1>
        <div className="btns">
          <a className="light-btn" href="/register">Register</a>
          <a className="dark-btn" href="/login">Login</a>
          <MetaMask />
        </div>
      </div>
    </div>
  )
}