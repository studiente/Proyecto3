// funciones.js
import { getData, save, remove, getDocumento, update, idrepetido } from "./firestore.js"
import { verificar, limpiar } from "./utilidades.js"

let id = 0;

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const product = {
            productID: document.getElementById('productID').value,
            productName: document.getElementById('productName').value,
            productModel: document.getElementById('productModel').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            releaseDate: document.getElementById('releaseDate').value,
            category: document.getElementById('category').value,
            availability: document.querySelector('input[name="availability"]:checked').value
        };

        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const id2 = document.getElementById('productID').value;
            const repetido = await idrepetido(id2);
            if (repetido) {
                Swal.fire({
                    title: "Error",
                    text: "El ID ingresado ya existe en la base de datos!!",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
            } else {
                save(product).then(() => {
                    Swal.fire({
                        title: "Guardado",
                        text: "Producto guardado exitosamente!",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK"
                    });
                });
            }
        } else {
            update(id, product).then(() => {
                Swal.fire({
                    title: "Actualizado",
                    text: "Producto actualizado exitosamente!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                });
                id = 0;
            });
        }
        limpiar();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    getData((datos) => {
        let tabla = '';
        datos.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.productID}</td>
                <td>${item.productName}</td>
                <td>${item.productModel}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>${item.releaseDate}</td>
                <td>${item.category}</td>
                <td>${item.availability}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${doc.id}">Editar</button>
                    <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenido').innerHTML = tabla;
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        remove(btn.id).then(() => {
                            Swal.fire({
                                title: "Eliminado!",
                                text: "Su registro ha sido eliminado exitosamente",
                                icon: "success"
                            });
                            btn.closest('tr').remove(); // Remove the row from the table
                        });
                    }
                });
            });
        });
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                const product = await getDocumento(btn.id);
                const p = product.data();
                document.getElementById('productID').value = p.productID;
                document.getElementById('productName').value = p.productName;
                document.getElementById('productModel').value = p.productModel;
                document.getElementById('description').value = p.description;
                document.getElementById('price').value = p.price;
                document.getElementById('releaseDate').value = p.releaseDate;
                document.getElementById('category').value = p.category;
                document.querySelector(`input[name="availability"][value="${p.availability}"]`).checked = true;
                document.getElementById('btnGuardar').value = 'Editar';
                document.getElementById('productID').readOnly = true;
                id = product.id;
            });
        });
    });
});
