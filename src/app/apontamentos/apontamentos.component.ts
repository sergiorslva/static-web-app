import { Component, OnInit } from '@angular/core';
import { ApontamentosService } from '../services/apontamentos-service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApontamentoModel } from '../model/apontamento-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apontamentos',
  templateUrl: './apontamentos.component.html',
  styleUrls: ['./apontamentos.component.scss']
})
export class ApontamentosComponent implements OnInit {

  public apontamentos: Array<ApontamentoModel>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private apontamentosService: ApontamentosService, private router: Router) { }

  ngOnInit(): void {
    this.carregarApontamentos();
  }

  carregarApontamentos() {
    this.apontamentosService.listarApontamentos()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: Array<ApontamentoModel>) => {
      this.apontamentos = data;
      console.log(this.apontamentos);
    });
  }

  excluir(event, apontamento) {

    event.preventDefault();

    this.apontamentosService.excluirApontamentos(apontamento)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: Array<ApontamentoModel>) => {
      this.carregarApontamentos();
    }, error => {
      alert(error);
    });
  }

  editar(apontamento) {
    this.router.navigate(['novo-apontamento', apontamento.partitionkey, apontamento.rowkey]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
