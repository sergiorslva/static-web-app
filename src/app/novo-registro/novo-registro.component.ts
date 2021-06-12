import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApontamentosService } from '../services/apontamentos-service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApontamentoModel } from '../model/apontamento-model';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-novo-registro',
  templateUrl: './novo-registro.component.html',
  styleUrls: ['./novo-registro.component.scss']
})
export class NovoRegistroComponent implements OnInit {

  public isEdit = false;

  apontamentoForm: FormGroup;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apontamentosService: ApontamentosService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.apontamentoForm = this.fb.group({
      partitionKey: [''],
      rowKey: [''],
      data: ['', Validators.required],
      valor: ['', Validators.required]
    });

    this.isEdit = (this.activatedRoute.snapshot.paramMap.get('partitionkey') != null);

    if(this.isEdit) {
      this.carregarApontamento(this.activatedRoute.snapshot.paramMap.get('partitionkey'), this.activatedRoute.snapshot.paramMap.get('rowkey'));
    } else {
      this.carregarForm();
    }

  }

  ngOnInit(): void {
  }

  carregarApontamento(partitionKey, rowKey) {
    this.apontamentosService.buscarApontamento(partitionKey, rowKey)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApontamentoModel) => {
        this.carregarFormParaEdicao(data);
      });
  }

  carregarForm() {
    this.apontamentoForm.patchValue({
      partitionKey: uuidv4(),
      rowKey: uuidv4()
    });
  }


  carregarFormParaEdicao(data: ApontamentoModel) {
    this.apontamentoForm.patchValue({
      partitionKey: data.partitionKey,
      rowKey: data.rowKey,
      data: moment(data.data).format('YYYY-MM-DD'),
      valor: data.valor
    });
  }

  onSubmit() {
    this.apontamentosService.adicionarApontamentos(this.apontamentoForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['apontamento']);
      }, error => {
        alert(error);
      })
  }

}
