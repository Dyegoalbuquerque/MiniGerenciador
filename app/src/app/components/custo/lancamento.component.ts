
import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustoService } from '../../services/custo.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Lancamento } from 'src/app/models/lancamento';
import { Categoria } from 'src/app/models/categoria';

@Component({
    selector: 'lancamento-dialog',
    templateUrl: 'lancamento.component.html',
    styleUrls: ['./lancamento.component.css']
  })
  export class LancamentoComponent implements OnInit {
  
    constructor( public dialogRef: MatDialogRef<LancamentoComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: Lancamento,  private _snackBar: MatSnackBar,
                private custoService: CustoService) {}
  
    lancamento: Lancamento;
    categorias: Categoria[];

    tipos = [{
      nome: "Saída",
      valor: "S"
    }, {
      nome: "Entrada",
      valor: "E"
    }];

    statusLista = [{
      nome: "A vencer",
      valor: "V"
    }, {
      nome: "Pago",
      valor: "PG"
    }, {
      nome: "Previsão",
      valor: "P"
    }];
  
    ngOnInit() {
      this.categorias = [];
      this.data.tipo = this.data.tipo == undefined ? "S" : this.data.tipo;
      this.data.status = this.data.status == undefined ? "V" : this.data.tipo;
      this.lancamento = this.data;
      this.obterCategorias();
    }

    obterCategorias(){
      this.custoService.obterCategorias().subscribe(data=>{
        this.categorias = data;
      }); 
    }
  
    salvar(): void{
      if(this.validar(this.lancamento)){

        this.custoService.salvarLancamento(this.lancamento).subscribe(data=>{
          this.lancamento = data;
          this.mostrarMensagem("Salvo com sucesso", "Lançamento");
          this.fechar();
        },
        err => { 
          this.mostrarMensagem("Ocorreu um problema", "Lançamento");
        }); 
        }else {
          this.mostrarMensagem("Preencha os campos obrigatórios", "Lançamento");
      }  
    }
  
    fechar(): void {
      this.dialogRef.close();
    }

    validar(item:Lancamento): boolean {

      return item.valor > 0 && item.vencimento  &&  item.descricao != "" && 
             item.tipo != "" && item.categoriaId != 0;
    }
  
    mostrarMensagem(mensagem: string, action: string) {
      this._snackBar.open(mensagem, action, {
        duration: 2000,
      });
    }
  }