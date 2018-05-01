import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Realisation e2e test', () => {

    let navBarPage: NavBarPage;
    let realisationDialogPage: RealisationDialogPage;
    let realisationComponentsPage: RealisationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Realisations', () => {
        navBarPage.goToEntity('realisation');
        realisationComponentsPage = new RealisationComponentsPage();
        expect(realisationComponentsPage.getTitle())
            .toMatch(/bprApp.realisation.home.title/);

    });

    it('should load create Realisation dialog', () => {
        realisationComponentsPage.clickOnCreateButton();
        realisationDialogPage = new RealisationDialogPage();
        expect(realisationDialogPage.getModalTitle())
            .toMatch(/bprApp.realisation.home.createOrEditLabel/);
        realisationDialogPage.close();
    });

    it('should create and save Realisations', () => {
        realisationComponentsPage.clickOnCreateButton();
        realisationDialogPage.setCreationDateInput(12310020012301);
        expect(realisationDialogPage.getCreationDateInput()).toMatch('2001-12-31T02:30');
        realisationDialogPage.setActionDateInput(12310020012301);
        expect(realisationDialogPage.getActionDateInput()).toMatch('2001-12-31T02:30');
        realisationDialogPage.actionTypeSelectLastOption();
        realisationDialogPage.setDescriptionInput('description');
        expect(realisationDialogPage.getDescriptionInput()).toMatch('description');
        realisationDialogPage.save();
        expect(realisationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RealisationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-realisation div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RealisationDialogPage {
    modalTitle = element(by.css('h4#myRealisationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    creationDateInput = element(by.css('input#field_creationDate'));
    actionDateInput = element(by.css('input#field_actionDate'));
    actionTypeSelect = element(by.css('select#field_actionType'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreationDateInput = function(creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    };

    getCreationDateInput = function() {
        return this.creationDateInput.getAttribute('value');
    };

    setActionDateInput = function(actionDate) {
        this.actionDateInput.sendKeys(actionDate);
    };

    getActionDateInput = function() {
        return this.actionDateInput.getAttribute('value');
    };

    setActionTypeSelect = function(actionType) {
        this.actionTypeSelect.sendKeys(actionType);
    };

    getActionTypeSelect = function() {
        return this.actionTypeSelect.element(by.css('option:checked')).getText();
    };

    actionTypeSelectLastOption = function() {
        this.actionTypeSelect.all(by.tagName('option')).last().click();
    };
    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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
