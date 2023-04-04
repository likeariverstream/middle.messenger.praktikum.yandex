import { withStore } from './withStore'

export const withUser = withStore((state) => {
    const userData = state.user
    userData.isLoading = state.user.isLoading
    userData.error = state.user.error
    return userData
})
