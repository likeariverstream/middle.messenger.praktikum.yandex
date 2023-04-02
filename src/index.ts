import AuthController from './controllers/auth-controller'
import { LoginPage } from './pages/login-page/login'
import { RegisterPage } from './pages/register-page/register'
import { MessengerPage } from './pages/messenger-page/messenger'
import { ProfilePage } from './pages/profile-page/profile'
import ChatsController from './controllers/chats-controller'
import { Routes } from './types/routes'
import Router from './utils/router'

window.addEventListener('DOMContentLoaded', async () => {
    Router
        .use(Routes.login, LoginPage)
        .use(Routes.register, RegisterPage)
        .use(Routes.messenger, MessengerPage)
        .use(Routes.settings, ProfilePage)

    let isProtectedRoute = true

    switch (window.location.pathname) {
    case Routes.login:
    case Routes.register:
        isProtectedRoute = false
        break
    default: break
    }

    try {
        await AuthController.fetchUser()
        Router.start()
        await ChatsController.fetchChats()
        if (!isProtectedRoute) {
            Router.go(Routes.messenger)
        }
    } catch (e) {
        Router.start()
        if (isProtectedRoute) {
            Router.go(Routes.login)
        }
    }
})
