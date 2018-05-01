package com.kyf.controller;

import com.kyf.domain.Person;
import com.kyf.dto.PersonResponse;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("person")
public class PersonController {

    public static final Person bigBoss = new Person("1", "Boss");

    static {

    }

    @RequestMapping("search/{name}")
    public PersonResponse findByName(@PathVariable(name = "query") String nameQuery){
        return new PersonResponse("finding a person by name " + nameQuery, "Not yet implemented");
    }

    @RequestMapping("{id}")
    public PersonResponse find(@PathVariable(name = "id") String personId){

        return new PersonResponse("finding a person " + personId, "Not yet implemented");
    }

    @RequestMapping("all")
    @ResponseBody
    public PersonResponse findAll(){

        return new PersonResponse("findAll our people", bigBoss);

    }

    @RequestMapping(value = "save", method =  RequestMethod.POST)
    @ResponseBody
    public PersonResponse save(@RequestBody Person aPerson){

        return new PersonResponse("findAll our people", bigBoss);

    }

}
