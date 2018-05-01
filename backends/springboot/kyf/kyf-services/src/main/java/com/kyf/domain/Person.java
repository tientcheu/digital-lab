package com.kyf.domain;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
@Getter
@Setter
public class Person implements Serializable {

    private String id;
    private String numeroMatricule;
    private String nom;
    private String prenom;
    private String sexe;
    private String descriptionComplementaire;

    public Person() {
    }

    public Person(String id, String name) {
        this.id = id;
        this.nom = name;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumeroMatricule() {
        return numeroMatricule;
    }

    public void setNumeroMatricule(String numeroMatricule) {
        this.numeroMatricule = numeroMatricule;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getDescriptionComplementaire() {
        return descriptionComplementaire;
    }

    public void setDescriptionComplementaire(String descriptionComplementaire) {
        this.descriptionComplementaire = descriptionComplementaire;
    }

}
