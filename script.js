class Cliente {

    constructor() {
        this.id = 1;
        this.arrClientes = [];
        this.EditID = null;
    }

    registrarCliente() {
        
        let cliente = this.lerDados();

        if (this.validaInput(cliente)) {
            if (this.EditID == null) {
                this.adicionar(cliente);
            }else{
                this.actualizar(this.EditID, cliente);
            }
            
        }

        this.saidaDeDados()
        this.closeModal()
    }

    adicionar(cliente) {
        this.arrClientes.push(cliente);
        this.id++;

        this.saidaDeDados()
    }

    saidaDeDados() {
        let tbody = document.querySelector('tbody')
        tbody.innerText = ""

        for (let i = 0; i < this.arrClientes.length; i++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_name = tr.insertCell()
            let td_telefone = tr.insertCell()
            let td_email = tr.insertCell()
            let td_accao = tr.insertCell()

            let btnEdit = document.createElement('button')
            let btnDelete = document.createElement('button')

            btnEdit.className = "edit"
            btnEdit.innerText = "Editar"
            btnEdit.setAttribute("onclick", "cliente.editarCliente("+JSON.stringify(this.arrClientes[i])+")")

            btnDelete.className = "delete"
            btnDelete.innerText = "Apagar"
            btnDelete.setAttribute("onclick", "cliente.exluirCliente("+ this.arrClientes[i].id +")")

            td_id.innerText = this.arrClientes[i].id;
            td_name.innerText = this.arrClientes[i].nome;
            td_telefone.innerText = this.arrClientes[i].telefone;
            td_email.innerText = this.arrClientes[i].email;
            td_accao.appendChild(btnEdit)
            td_accao.appendChild(btnDelete)

        }
    }

    lerDados() {
        let cliente = {};
        cliente.id = this.id;
        cliente.nome = document.querySelector('#name').value;
        cliente.telefone = document.querySelector('#number').value;
        cliente.email = document.querySelector('#email').value;

        return cliente;
    }

    validaInput(cliente) {
        let msg = ""
        if (cliente.nome == "") {
            msg += '!- Informe o Nome do Cliente \n'
        }
        if (cliente.telefone == "") {
            msg += '!- Informe o Telefone do Cliente \n'
        }
        if (cliente.email == "") {
            msg += '!- Informe o Email do Cliente \n'
        }
        if (msg != "") {
            alert(msg)
            return false
        }
        return true
    }

    editarCliente(dados){
        this.openModal()
        this.EditID = dados.id
        document.querySelector('#name').value = dados.nome
        document.querySelector('#number').value = dados.telefone
        document.querySelector('#email').value = dados.email
        document.querySelector('.btn-Sv').innerText = "Actualizar"
        document.querySelector('#h1').innerText = "Editar ID Cliente nº: "+dados.id
    }

    actualizar(id, cliente){
        for (let index = 0; index < this.arrClientes.length; index++) {

            if (this.arrClientes[index].id == id) {
                this.arrClientes[index].nome = cliente.nome
                this.arrClientes[index].telefone = cliente.telefone
                this.arrClientes[index].email = cliente.email
            }
            
        }
    }

    exluirCliente(id) {
        let tbody = document.querySelector('tbody')
        for (let index = 0; index < this.arrClientes.length; index++) {
            
            if (this.arrClientes[index].id == id) {
                if (confirm("Deseja deletar o ID Cliente nº: "+this.arrClientes[index].id)) {
                    this.arrClientes.splice(index, 1)
                tbody.deleteRow(index)
                }
                
            }
            
        }
    }

    closeModal() {
        modal.style.display = "none"
        document.querySelector('.btn-Sv').innerText = "Salvar"
        document.querySelector('#h1').innerText = "Add Novo Cliente"
        this.EditID = null;
    }
    openModal() {
        modal.style.display = "flex"
        
        document.querySelector('#name').value = ""
        document.querySelector('#number').value = ""
        document.querySelector('#email').value = ""
    }
}



var cliente = new Cliente();

const btnAddNovoCliente = document.querySelector('#add-cliente')
const modal = document.querySelector('.modal-area')
const btnAsideModal = document.querySelector('span')


btnAddNovoCliente.addEventListener('click', cliente.openModal)
btnAsideModal.addEventListener('click', cliente.closeModal)


