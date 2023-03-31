// import BaseAPI from './base-api'

// export class ProfileAPI extends BaseAPI {
//     constructor() {
//         super('/user')
//     }

//     read(identifier: string): Promise<any> {
//         return this.http.get(`/${identifier}`)
//     }

//     update(data: any): Promise<any> {
//         return this.http.put('/profile', data)
//     }

//     loadAvatar(data: FormData): Promise<any> {
//         return this.http.put('/profile/avatar', data)
//     }

//     changePassword(data: any): Promise<any> {
//         return this.http.put('/password', data)
//     }

//     searchUser(data: any): Promise<any> {
//         return this.http.post('/search', data)
//     }

//     create = undefined

//     delete = undefined
// }

// export default new ProfileAPI()
