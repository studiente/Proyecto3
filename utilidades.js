// utilidades.js
const verificar = (id) => {
    const input = document.getElementById(id);
    const div = document.getElementById('e-' + id);
    input.classList.remove('is-invalid');
    if (input.value.trim() == '') {
        input.classList.add('is-invalid');
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        input.classList.add('is-valid');
        div.innerHTML = '';
        if (id == 'price' && input.value < 0) {
            input.classList.add('is-invalid');
            div.innerHTML = '<span class="badge bg-danger">El precio debe ser positivo</span>';
        }
    }
};

const limpiar = () => {
    document.querySelector('form').reset();
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid');
        item.classList.remove('is-valid');
        const errorElement = document.getElementById('e-' + item.id)
        if(errorElement){
        errorElement.innerHTML = '';
        }
    });
    document.getElementById('productID').readOnly = false;
    document.getElementById('btnGuardar').value = 'Guardar';
};

const soloNumeros = (evt) => {
    return evt.keyCode >= 48 && evt.keyCode <= 57;
};

export { verificar, limpiar, soloNumeros };


