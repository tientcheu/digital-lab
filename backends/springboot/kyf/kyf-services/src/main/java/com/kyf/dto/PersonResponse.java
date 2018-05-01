package com.kyf.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PersonResponse {

    private String request;
    private Serializable response;

    public PersonResponse(String request, Serializable response) {
        this.request = request;
        this.response = response;

    }
}
