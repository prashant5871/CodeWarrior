package com.codewarrior.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Role {

    @Id
    private int id;

    private String autority;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAutority() {
        return autority;
    }

    public void setAutority(String autority) {
        this.autority = autority;
    }

    @Override
    public String toString() {
        return "Role [id=" + id + ", autority=" + autority + "]";
    }

}
