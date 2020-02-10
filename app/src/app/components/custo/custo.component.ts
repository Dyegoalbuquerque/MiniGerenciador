
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Lancamento } from 'src/app/models/lancamento';
import { CustoService } from '../../services/custo.service';
import { LancamentoComponent } from './lancamento.component';
import { IgxStringFilteringOperand, IgxTreeGridComponent } from "igniteui-angular";
import { DataUtils } from 'src/app/dataUtils';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Categoria } from 'src/app/models/categoria';

@Component({
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.css']
})
export class CustoComponent implements OnInit {

  constructor(private custoService: CustoService, public dialog: MatDialog,
    private _snackBar: MatSnackBar, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.definirIcones();
  }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("treegrid", { read: IgxTreeGridComponent, static: true }) treegrid: IgxTreeGridComponent;

  cronogramas: Lancamento[];
  totalLancamentos = 0;
  categorias: Categoria[];

  colunasLancamentos: string[] = ['data', 'mes', 'vencimento', 'categoria', 'descricao', 'status', 'valor', 'tipo', 'remover'];
  dataSourceLancamento: MatTableDataSource<Lancamento>;

  ngOnInit() {
    this.categorias = [];
    this.dataSourceLancamento = new MatTableDataSource<Lancamento>([]);
    this.obterLancamentos();
    this.obterCronogramas();
  }

  definirIcones() {
    let lista = [{ nome: 'done-24px', caminho: 'assets/img/done-24px.svg', },
    { nome: 'trending_down-24px', caminho: 'assets/img/trending_down-24px.svg' },
    { nome: 'trending_up-24px', caminho: 'assets/img/trending_up-24px.svg' }];
    for (let i = 0; i < lista.length; i++) {
      this.iconRegistry.addSvgIcon(lista[i].nome, this.sanitizer.bypassSecurityTrustResourceUrl(lista[i].caminho));
    }
  }

  obterLancamentos() {
    this.custoService.obterLancamentoPorAno(2019).subscribe(data => {
      this.dataSourceLancamento = new MatTableDataSource<Lancamento>(data);
      this.dataSourceLancamento.paginator = this.paginator;
    });
  }

  obterCronogramas() {
    this.custoService.obterCronogramasPorAno(2019).subscribe(data => {

      let itens = [];
      this.totalLancamentos = 0;

      data = data.map(o => ({ ...o, cronogramaId: o.mes }));

      for (let i = 0; i < 12; i++) {

        let lancamentos = data.filter(x => x.mes == DataUtils.obterNomeMes(i));

        if (lancamentos.length > 0) {
          let total = 0;
          lancamentos.forEach(x => {
            total += x.valor;
            if (x.status == 'PG') {
              this.totalLancamentos += x.valor;
            }
          });

          let cabecalho = { id: DataUtils.obterNomeMes(i), descricao: "", valor: total, vencimento: "", tipo: "" };

          itens.push(cabecalho);
          itens = itens.concat(lancamentos);
        }
      }
      this.cronogramas = itens;
    });
  }

  removerLancamento(id: number) {

    this.custoService.removerLancamento(id).subscribe(data => {
      this.obterLancamentos();
      this.obterCronogramas();

      this.mostrarMensagem("Removido com sucesso", "Lançamento");
    });
  }

  confirmarPagamentoLancamento(id: number) {
    let lancamento = new Lancamento();
    lancamento.id = id;

    this.custoService.confirmarPagamentoLancamento(lancamento).subscribe(data => {
      this.obterLancamentos();

      this.mostrarMensagem("Confirmado pagamento com sucesso", "Lançamento");
    });
  }

  openLancamentoDialog(): void {
    const dialogRef = this.dialog.open(LancamentoComponent, {
      width: '500px',
      height: '560px',
      data: new Lancamento()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterLancamentos();
      this.obterCronogramas();
    });
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }

 
  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLancamento.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceLancamento.paginator) {
      this.dataSourceLancamento.paginator.firstPage();
    }
  }
}





