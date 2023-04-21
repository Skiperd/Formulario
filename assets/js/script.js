class validaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if(camposValidos && senhasValidas) {
      alert('Formulário enviado...')
      this.formulario.submit();
    }
  }

  senhasSaoValidas() {
    let valid = true;
    const senha = this.formulario.querySelector('.senha')
    const senha2 = this.formulario.querySelector('.repetirsenha')

    if(senha.value !== senha2.value) {
      valid = false;
      this.criaErro(senha, 'As senhas precisam ser iguais')
      this.criaErro(senha2, 'As senhas precisam ser iguais')
    }
    if(senha.value.length <6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'As senhas precisam esta entre 6 e 12 caracteres')
    }

    return valid
  }

  camposSaoValidos() {
    let valid = true;

    for(let errorMsg of this.formulario.querySelectorAll('.error-msg')) {
      errorMsg.remove()
    }

    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;
      if(!campo.value) {
        this.criaErro(campo, `Campo "${label}" não pode esta vazio...`)  
         valid = false;
      }
      if(campo.classList.contains('cpf')) {
        if(!this.validaCPF(campo)) valid = false;
      }
      if(campo.classList.contains('usuario')) {
        if(!this.validaUsuario(campo)) valid = false;
      }
    }
    return valid;
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;
    if(usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres')
      valid = false;
    }
    if(!usuario.match(/[a-zA-Z0-9]+/g)) {
      this.criaErro(campo, 'Nome de Usuário precisa conter apenas letras ou números')
      valid = false;
    }
    return valid;
  }

  validaCPF(campo) {
    const cpf = new validaCpf(campo.value)
    if(!cpf.valida()) {
      this.criaErro(campo, 'CPF Inválido')
      return false;
    } else {
      return true
    }
  }

  criaErro(campo, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg
    div.classList.add('error-msg')
    campo.insertAdjacentElement('afterend', div);
  }

}

const valida = new validaFormulario();