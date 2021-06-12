import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ApontamentosService {

    rootURL = '/api';

    constructor(private http: HttpClient) {

    }

    listarApontamentos() {
        return this.http.get(this.rootURL + '/ListarApontamentosFunction');
    }

    buscarApontamento(partitionKey, rowKey) {
      return this.http.get(`${this.rootURL}/ListarPorPartitionERowkeyFunction?partitionkey=${partitionKey}&rowkey=${rowKey}`);
    }

    adicionarApontamentos(form) {
      return this.http.post(this.rootURL + '/CriarApontamentoFunction', form);
    }

    excluirApontamentos(form) {
      return this.http.post(this.rootURL + '/ExcluirApontamentoFunction', form);
    }
}
