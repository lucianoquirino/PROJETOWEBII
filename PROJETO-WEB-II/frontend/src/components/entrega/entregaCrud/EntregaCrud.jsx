import React, {Component} from 'react'
import axios from 'axios'
import Main from '../../templates/Main'

const baseUrl = 'http://localhost:3001/entregas'

const headerProps={
    title: 'Entrega',
    subtitle: 'Cadastro de entrega: Incluir, Listar, Alterar e Excluir!'
}
const initialState = {
    entrega:{destinatario: '', endereco: ''},
    list:[]
}


export default class EntregaCrud extends Component{
    
    render(){

        return(
            <Main {...headerProps}>
                {this.renderTable()}
            </Main>
        )
    }
    state = { ...initialState }

    componentWillMount(){
        axios(baseUrl).then(resp =>{
            this.setState({list: resp.data})
        })
    }

    clear(){
        this.setState({entrega: initialState.entrega})
    }

    save(){
        const entrega = this.state.entrega
        const method = entrega.id ? 'put' : 'post'
        const url = entrega.id ? `${baseUrl}/${entrega.id}`: baseUrl
        axios[method](url,entrega)
            .then(resp =>{
                const list = this.getUpdateList(resp.data)
                this.setState({ entrega: initialState.entrega, list})
            }
        )
    }
    
    getUpdateList(entrega){
        const list = this.state.list.filter(u => u.id !== entrega.id)
        list.unshift(entrega)
        return list
    }

    updateField(event){
        const entrega = this.state.entrega
        entrega[event.target.destinatario] = event.target.value
        this.setState({ entrega })
    }

    load(entrega){
        this.setState({entrega})
    }

    remove(entrega){
        axios.delete(`${baseUrl}/$entrega.id`).then(resp =>{
            const list = this.state.list.filter(u => u !== entrega)
            this.setState({list})
        })
    }

    // renderForm(){
    //     return(
    //         <div classDestinatario="form">
    //             <div classDestinatario="row">
    //                 <div c="col-12 col-nd-6">
    //                     <div classDestinatario="form-group">
    //                         <label>Destinário</label>
    //                         <input type="text" classDestinatario="form-control"
    //                             destinatario="destinatario"
    //                             value={this.state.entrega.destinatario}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o destinatário"/>
    //                     </div>
    //                 </div>

    //                 <div classEndereco="col-12 col-nd-6">
    //                     <div classEndereco="form-group">
    //                         <label>Endereço</label>
    //                         <input type="text" classEndereco="form-control"
    //                             endereco="endereco"
    //                             value={this.state.entrega.endereco}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o endereço"/>
    //                     </div>
    //                 </div>
    //             </div>

    //             <hr />

    //             <div classDestinatario="row">
    //                 <div classDestinatario="col-12 d-flex justify-content-end">
    //                     <button classDestinatario="btn btn-primart"
    //                         onClick = {e => this.save(e)}>
    //                         Salvar
    //                     </button>

    //                     <button classDestinatario="btn btn-secondary ml-2"
    //                         onClick = {e => this.clear(e)}>
    //                         Cancelar
    //                     </button>

    //                 </div>

    //             </div>

    //         </div>
    //     )
    // }

    renderTable(){
        return(
            <table classDestinatario="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Destinário</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(entrega =>{
            return(
                <tr key={entrega.id}>
                    <td>{entrega.id}</td>
                    <td>{entrega.destinatario}</td>
                    <td>{entrega.endereco}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={()=> this.load(entrega)}>
                                <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-warning"
                            onClick={()=> this.remove(entrega)}>
                                <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }


}