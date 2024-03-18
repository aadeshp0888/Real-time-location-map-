import React, { useState, lazy, Suspense } from 'react'
import Loader from '../ui/Loader'
const Register = lazy(() => import('../forms/register/Register'))
const Login = lazy(() => import('../forms/login/Login'))

const UserAuthentication = ({
    currentUsername,
    setCurrentUsername,
    myStorage
}) => {
    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const handleLogout = () => {
        // Show confirmation dialog
        const confirmLogout = window.confirm("Are you sure you want to log out?")

        // Check if user confirmed the logout
        if (confirmLogout) {
            setCurrentUsername(null)
            myStorage.removeItem("user")
        }
    }

    return (
        <>
            {currentUsername ? (
                <button className="button logout" onClick={handleLogout}>
                    Log out
                </button>
            ) : (
                <div className="buttons">
                    <button className="button login" onClick={() => {
                        setShowLogin(true)
                        setShowRegister(false)
                    }}>
                        Log in
                    </button>
                    <button className="button register" onClick={() => {
                        setShowRegister(true)
                        setShowLogin(false)
                    }}>
                        Register
                    </button>
                </div>
            )}
            <Suspense fallback={<Loader/>}> 
            {showRegister && <Register setShowRegister={setShowRegister} />}
            {showLogin && <Login setShowLogin={setShowLogin} setCurrentUsername={setCurrentUsername} myStorage={myStorage} />}
            </Suspense>
        </>
    )
}

export default UserAuthentication
