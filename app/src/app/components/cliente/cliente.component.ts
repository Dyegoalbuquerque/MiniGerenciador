
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
    selector: 'cliente-dialog',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ClienteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Cliente, private _snackBar: MatSnackBar,
        private clienteService: ClienteService) { }

    cliente: Cliente;

    tipos = [{
        nome: "Novo",
        valor: "N"
      }, {
        nome: "Ativo",
        valor: "A"
      }, {
        nome: "Inativo",
        valor: "I"
      }];

    ngOnInit() {
      this.data.tipo = this.data.tipo == undefined ? "N" : this.data.tipo;
      this.cliente = this.data;
    }

    salvar(): void {
        if (this.validar(this.cliente)) {

            this.clienteService.salvarCliente(this.cliente).subscribe(data => {
                this.cliente = data;
                this.mostrarMensagem("Salvo com sucesso", "Cliente");
                this.fechar();
            },
                err => {
                    this.mostrarMensagem("Ocorreu um problema", "Cliente");
                });
        } else {
            this.mostrarMensagem("Preencha os campos obrigatórios", "Cliente");
        }
    }

    fechar(): void {
        this.dialogRef.close();
    }

    validar(item: Cliente): boolean {

        return item.nome && item.logradouro && item.numeroLogradouro &&
            item.tipo && item.bairro &&
            (item.telefone != '' || item.celular1 != '' || item.celular2 != '');
    }

    mostrarMensagem(mensagem: string, action: string) {
        this._snackBar.open(mensagem, action, {
            duration: 2000,
        });
    }
}





