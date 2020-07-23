import { Component, OnInit } from '@angular/core';
import { Taco } from '../../models/Taco';
import { TacoService } from 'src/app/services/taco.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  //Class property, change it for a model
  taco = new Taco();
  tacoEditing = new Taco();
  tacos: Taco[] = [];
  selectedTaco: Taco;
  isEdit: boolean;
  cardTitle: string;

  constructor(private _tacoService: TacoService) {
    this.taco.id = null;
    this.taco.nombre = '';
    this.taco.precio = null;
    this.cardTitle = 'Registrar taco'
  }

  ngOnInit() {
    this.getTacos()
    this.isEdit = false;
    console.log(this.taco)
  }

  onSubmit() {
    if (this.taco.id != 0 && this.taco.nombre != '' && this.taco.precio != 0) {
      if (this.isEdit) {
        this._tacoService.updateTaco(this.taco).subscribe(
          success => {
            alert('Registro actualizado!');
            this.isEdit = false;
            this.cardTitle = 'Registar taco'
            this.reset();
            this.getTacos()
          },
          error => {
            alert('Error!');
          }
        )
      } else {
        this.insertTaco()
        this.reset()
        this.isEdit = false;
        this.cardTitle = 'Registar taco'
      }
    } else {
      alert('Ingrese datos válidos');
    }

  }

  cancel() {
    this.getTacos();
    this.reset();
  }

  reset() {
    this.taco.id = null;
    this.taco.nombre = '';
    this.taco.precio = null;
    this.cardTitle = 'Registrar taco';
    this.getTacos();
  }

  getTacos() {
    this._tacoService.getTacos().subscribe(
      tacos => {
        console.log(tacos)
        this.tacos = tacos
      },
      error => {
        console.log(error)
      }
    )
  }


  insertTaco() {
    this._tacoService.insertTaco(this.taco).subscribe(
      success => {
        alert('Agregado con éxito!')
        this.getTacos()
      },
      error => {
        alert('Error al agregar')
      }
    )
  }

  deleteTaco(id: number) {
    if (confirm('¿Realmente desea eliminar a este registro?')) {
      this._tacoService.deleteTaco(id).subscribe(
        success => {
          alert('Eliminado con éxito!');
          this.getTacos();
        },
        error => {
          alert('Error!');
        }
      )
    }


  }

  editRow(taco: Taco) {
    this.taco = taco;
    this.tacoEditing = taco;
    this.isEdit = true;
    this.cardTitle = 'Editar taco';
  }

}
