package com.kyf.contact;


import com.kyf.domain.entities.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@RestController
@RequestMapping("contact")
public class ContactController {

    private final Contact defaultContact;

    @Autowired
    private ContactRepository contactRepository;

    {
        this.defaultContact = new Contact();
        this.defaultContact.setEmail("ben.monkam@gmail.com");
        this.defaultContact.setNumeroMobile("06594921xx");
        this.defaultContact.setNom("TIENTCHEU MONKAM");
        this.defaultContact.setNom("Ben Bertrand");
    }

    @PostMapping(value = "save")
    public ResponseEntity<Contact> create(@RequestBody Contact contactDto, HttpServletResponse response){

        // validate the contract


        // save contact
        this.contactRepository.save(contactDto);

        // return contact with ID
        return new ResponseEntity<Contact>(contactDto, HttpStatus.CREATED);

    }

    @PostMapping("{id}")
    public ResponseEntity<Contact> update(@RequestBody Contact contactDto, HttpServletResponse response){

        // check if contact exists
        if (contactDto.getId() == null || !this.contactRepository.existsById(contactDto.getId())) {
            throw new IllegalArgumentException("The contact does not exist");
        }

        // save contact
        this.contactRepository.save(contactDto);

        // return contact with ID
        return new ResponseEntity<Contact>(contactDto, HttpStatus.OK);

    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){

        // do some checks
        if (! contracExists(id)) {
            throw new IllegalArgumentException("The contact ID is required");
        }

        // delete the contact
        deleteContract(id);

        // return deletion message
        return new ResponseEntity<String>("Contact delete", HttpStatus.OK);

    }

    private void deleteContract(Long id) {
        this.contactRepository.deleteById(id);
    }

    private boolean contracExists(Long id) {
        return this.contactRepository.existsById(id);
    }

    @GetMapping("{id}")
    public ResponseEntity<Contact> findOne(@PathVariable Long id){

        // find the contact
        Optional<Contact> contact = this.contactRepository.findById(id);

        // return the contact
        return new ResponseEntity<Contact>(contact.orElse(null), HttpStatus.OK);

    }

    @GetMapping("/")
    public ResponseEntity<Iterable<Contact>> findAll(){

        // retrieve all contacts
        return new ResponseEntity<Iterable<Contact>>(contactRepository.findAll(), HttpStatus.OK);

    }
}
