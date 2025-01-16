document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    const correo = document.getElementById('correo')
    const contraseña = document.getElementById('contraseña')
    const responseDiv = document.getElementById('response')

    if (!form) {
        console.error('No se encontró el formulario. Verifica el selector.')
        return
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        responseDiv.innerHTML = ''

        if (!correo.value.trim()) {
            responseDiv.innerHTML = '<p class="text-danger">El campo de correo es obligatorio.</p>'
            return
        }

        if (!contraseña.value.trim()) {
            responseDiv.innerHTML = '<p class="text-danger">El campo de contraseña es obligatorio.</p>'
            return
        }

        responseDiv.innerHTML = `
            <p class="text-success">Inicio de sesión exitoso.</p>`
    })
})
