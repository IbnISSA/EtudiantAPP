import { Injectable } from '@angular/core';
import { Classe, Etudiant } from '../model/etudiant.model';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
 
  baseURL = "http://localhost:3000"
  etudiantsObs:  Observable<Etudiant[]>[] = [];
  etudiants:Etudiant[] = [];
  classes:Classe[] = [];  
  etudiant!: Etudiant;
  constructor( public datepipe: DatePipe, private http: HttpClient) {
   
  }
 
  ajouterEtudiant(etudiant:Etudiant): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(etudiant);
    console.log("body---"+body)
    let response = this.http.post(`${this.baseURL}/etudiants`, body,{'headers':headers})
    console.log("response---"+response);
    return response
  }


  listeEtudiant() {
    this.http.get(`${this.baseURL}/etudiants/`).subscribe(res => {
      this.etudiants = res as Etudiant[]
      this.trierEtudiants() 
    }) 
  }
  listeClasses() {
    this.http.get(`${this.baseURL}/classes/`).subscribe(res => {
      this.classes = res as Classe[]
      console.log("classe---"+this.classes);
      
    }) 
  }

  consulterEtudiant(id: number): Etudiant {
    this.etudiant = this.etudiants.find(e => e.id == id)!;
    return this.etudiant;
  }

  supprimerEtudiant(etu: Etudiant) {
    this.http.delete(`${this.baseURL}/etudiants/${etu.id}`)
        .subscribe({
            next: data => {
                console.log(data);
            },
            error: error => {
                console.error('There was an error!', error);
            }
      });
  }

  trierEtudiants(): Etudiant[] {
    this.etudiants = this.etudiants.sort((a, b) => {
      if (a.nomEtudiant && b.nomEtudiant) {
        if (a.nomEtudiant.toLowerCase() < b.nomEtudiant.toLowerCase()) {
          return -1;
        }
        if (a.nomEtudiant.toLocaleLowerCase() > b.nomEtudiant.toLocaleLowerCase()) {
          return 1;
        }
      }
      return 0;
    });
    return this.etudiants
  }

  updateEtudiant(etu: any): Observable<any> {
    return this.http.patch(`${this.baseURL}/etudiants/${etu.id}`, etu)
}

  generateMatricule():string{
    var date = new Date()
    let date_string = this.datepipe.transform(date, 'ddMMyyyyhhmmss'); 
    return "Et-"+date_string+"-@"
  }
}

