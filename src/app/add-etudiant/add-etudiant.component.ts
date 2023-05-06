import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.css']
})
export class AddEtudiantComponent implements OnInit{
  newEtudiant = new Etudiant();
  selectedClasse: any
  constructor(public etudiantService: EtudiantService,  private router :Router ) { }

  ngOnInit(): void { 
    this.newEtudiant.matriculeEtudiant = this.etudiantService.generateMatricule()
  }


  addEtudiant() {
    this.etudiantService.ajouterEtudiant(this.newEtudiant)
      .subscribe(data => {
        console.log(data)
        this.router.navigate(['etudiants']);
      })      
  }

  onChange(){
    console.log(this.selectedClasse);
    this.newEtudiant.classe = this.selectedClasse
  }

   

}
