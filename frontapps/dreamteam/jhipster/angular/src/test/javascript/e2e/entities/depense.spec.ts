import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Depense e2e test', () => {

    let navBarPage: NavBarPage;
    let depenseDialogPage: DepenseDialogPage;
    let depenseComponentsPage: DepenseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Depenses', () => {
        navBarPage.goToEntity('depense');
        depenseComponentsPage = new DepenseComponentsPage();
        expect(depenseComponentsPage.getTitle())
            .toMatch(/bprApp.depense.home.title/);

    });

    it('should load create Depense dialog', () => {
        depenseComponentsPage.clickOnCreateButton();
        depenseDialogPage = new DepenseDialogPage();
        expect(depenseDialogPage.getModalTitle())
            .toMatch(/bprApp.depense.home.createOrEditLabel/);
        depenseDialogPage.close();
    });

    it('should create and save Depenses', () => {
        depenseComponentsPage.clickOnCreateButton();
        depenseDialogPage.setCreationDateInput(12310020012301);
        expect(depenseDialogPage.getCreationDateInput()).toMatch('2001-12-31T02:30');
        depenseDialogPage.setEventDateInput(12310020012301);
        expect(depenseDialogPage.getEventDateInput()).toMatch('2001-12-31T02:30');
        depenseDialogPage.setDescriptionInput('description');
        expect(depenseDialogPage.getDescriptionInput()).toMatch('description');
        depenseDialogPage.statutSelectLastOption();
        depenseDialogPage.save();
        expect(depenseDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DepenseComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-depense div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DepenseDialogPage {
    modalTitle = element(by.css('h4#myDepenseLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    creationDateInput = element(by.css('input#field_creationDate'));
    eventDateInput = element(by.css('input#field_eventDate'));
    descriptionInput = element(by.css('input#field_description'));
    statutSelect = element(by.css('select#field_statut'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreationDateInput = function(creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    };

    getCreationDateInput = function() {
        return this.creationDateInput.getAttribute('value');
    };

    setEventDateInput = function(eventDate) {
        this.eventDateInput.sendKeys(eventDate);
    };

    getEventDateInput = function() {
        return this.eventDateInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setStatutSelect = function(statut) {
        this.statutSelect.sendKeys(statut);
    };

    getStatutSelect = function() {
        return this.statutSelect.element(by.css('option:checked')).getText();
    };

    statutSelectLastOption = function() {
        this.statutSelect.all(by.tagName('option')).last().click();
    };
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
