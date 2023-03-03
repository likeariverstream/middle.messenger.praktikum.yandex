export const getFormData = (e: Event | SubmitEvent, id: string): void => {
    e.preventDefault()
    const form = document.querySelector(id)
    if (form) {
        const inputs = form.querySelectorAll('input')
        const data: { [key: string]: string | number } = {}
        inputs.forEach((input) => {
            data[input.name] = input.value
        })
        console.log(data)
    }
}
