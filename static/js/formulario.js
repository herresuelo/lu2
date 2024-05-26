const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	apellido: false,
	nombre: false,
	email: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`rama_${campo}`).classList.remove('formulario_rama-incorrecto');
		document.getElementById(`rama_${campo}`).classList.add('formulario_rama-correcto');
		document.querySelector(`#rama_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#rama_${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#rama_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`rama_${campo}`).classList.add('formulario_rama-incorrecto');
		document.getElementById(`rama_${campo}`).classList.remove('formulario_rama-correcto');
		document.querySelector(`#rama_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#rama_${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#rama_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.apellido && campos.nombre && campos.email && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario_rama-correcto').forEach((icono) => {
			icono.classList.remove('formulario_rama-correcto');
		});
	} else {
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
	}
});