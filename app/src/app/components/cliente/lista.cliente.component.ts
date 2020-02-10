
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ClienteComponent } from '../cliente/cliente.component';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    templateUrl: './lista.cliente.component.html',
    styleUrls: ['./lista.cliente.component.css']
})

export class ListaClienteComponent implements OnInit {

    constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private clienteService: ClienteService,
                private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
        this.definirIcones();
    }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    colunasCliente: string[] = ['rg', 'cpf', 'nome', 'logradouro', 'numero', 'bairro', 'complemento', 'tipo', 'remover'];
    dataSourceCliente: MatTableDataSource<Cliente>;

    definirIcones() {
        let lista = [{ nome: 'done-24px', caminho: 'assets/img/done-24px.svg', },
        { nome: 'trending_down-24px', caminho: 'assets/img/trending_down-24px.svg' },
        { nome: 'trending_up-24px', caminho: 'assets/img/trending_up-24px.svg' }];
        for (let i = 0; i < lista.length; i++) {
          this.iconRegistry.addSvgIcon(lista[i].nome, this.sanitizer.bypassSecurityTrustResourceUrl(lista[i].caminho));
        }
      }


    ngOnInit() {
        this.dataSourceCliente = new MatTableDataSource<Cliente>([]);
        this.obterClientes();
    }

    obterClientes() {
        this.clienteService.obterClientes().subscribe(data => {
            this.dataSourceCliente = new MatTableDataSource<Cliente>(data);
            this.dataSourceCliente.paginator = this.paginator;
        });
    }

    removerCliente(id: number) {

        this.clienteService.removerCliente(id).subscribe(data => {
            this.obterClientes();

            this.mostrarMensagem("Removido com sucesso", "Cliente");
        });
    }

    openClienteDialog(): void {
        const dialogRef = this.dialog.open(ClienteComponent, {
            width: '450px',
            height: '680px',
            data: new Cliente()
        });

        dialogRef.afterClosed().subscribe(result => {
            this.obterClientes();
        });
    }

    mostrarMensagem(mensagem: string, action: string) {
        this._snackBar.open(mensagem, action, {
            duration: 2000,
        });
    }
}





