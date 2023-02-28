import { Button } from "./components/button/button"
import { render } from "./utils/render"

document.addEventListener("DOMContentLoaded", () => {
    const button = new Button('button', {text: 'Назад', class: 'button', type: 'button'})
    render("#root", button)
})