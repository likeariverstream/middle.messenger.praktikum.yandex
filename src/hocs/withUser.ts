import { withStore } from './withStore'

const withUser = withStore((state) => {
    const userData = state.user
    userData.isLoading = state.user.isLoading
    userData.error = state.user.error
    return userData
})

export default withUser
