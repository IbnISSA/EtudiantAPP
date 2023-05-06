import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {

  etudiants: Etudiant[] = [];
  keyWord: string = ""
  constructor(public etudiantService: EtudiantService, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.etudiantService.listeEtudiant();
    this.etudiantService.listeClasses();
  }

  supprimerEtudiant(e: Etudiant) {
    console.log(e);
    let conf = confirm("Voulez-vous vraiment ?");
    if (conf) {
      this.etudiantService.supprimerEtudiant(e);
      this.etudiantService.listeEtudiant();
    }
  }
}