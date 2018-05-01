package com.kyf.domain.entities;

import java.time.LocalDate;

public class Event {

    private String id;
    private LocalDate dateOccurence;
    private LocalDate dateSaisie;
    private EventImpact impactEmotionnel;
    private int niveau;
    private String titre;
    private String description;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDateOccurence() {
        return dateOccurence;
    }

    public void setDateOccurence(LocalDate dateOccurence) {
        this.dateOccurence = dateOccurence;
    }

    public LocalDate getDateSaisie() {
        return dateSaisie;
    }

    public void setDateSaisie(LocalDate dateSaisie) {
        this.dateSaisie = dateSaisie;
    }

    public EventImpact getImpactEmotionnel() {
        return impactEmotionnel;
    }

    public void setImpactEmotionnel(EventImpact impactEmotionnel) {
        this.impactEmotionnel = impactEmotionnel;
    }

    public int getNiveau() {
        return niveau;
    }

    public void setNiveau(int niveau) {
        this.niveau = niveau;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
