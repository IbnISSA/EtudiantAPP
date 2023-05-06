import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(public etudiantService: EtudiantService ) {
   
  }
 ngOnInit(): void {
   this.etudiantService.listeClasses();
   this.etudiantService.listeEtudiant();
 }

 getNbEtudiant(nomClasse: any){
  return this.etudiantService.etudiants.filter(e => e.classe.nomClasse == nomClasse).length;
}

}
