import { authController } from './controllers/auth-controller'
import { LoginPage } from './pages/login-page/login'
import { RegisterPage } from './pages/register-page/register'
import { MessengerPage } from './pages/messenger-page/messenger'
import { ProfilePage } from './pages/profile-page/profile'
import { chatsController } from './controllers/chats-controller'
import { Routes } from './types/routes'
import { router } from './utils/router'
import './index.pcss'

window.addEventListener('DOMContentLoaded', async () => {
    router
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
        await authController.fetchUser()
        router.start()
        await chatsController.fetchChats()
        if (!isProtectedRoute) {
            router.go(Routes.messenger)
        }
    } catch (e) {
        router.start()
        if (isProtectedRoute) {
            router.go(Routes.login)
        }
    }
})
