import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './material-module';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { CustoComponent } from './components/custo/custo.component';
import { ListaClienteComponent } from './components/cliente/lista.cliente.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { LancamentoComponent } from './components/custo/lancamento.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { IgxTreeGridModule, IgxInputGroupModule, IgxRadioModule, IgxDialogModule, IgxButtonModule, 
         IgxRippleModule, IgxSwitchModule } from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent, LoginComponent,
    CustoComponent, LancamentoComponent, LoginComponent, ClienteComponent, ListaClienteComponent
  ],
  entryComponents: [LancamentoComponent, ClienteComponent],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule,
    ReactiveFormsModule, MaterialModule, HttpClientModule,
    BrowserAnimationsModule,IgxTreeGridModule , IgxInputGroupModule, 
    IgxDialogModule, IgxButtonModule, IgxRippleModule, IgxSwitchModule, 
    IgxRadioModule, NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
