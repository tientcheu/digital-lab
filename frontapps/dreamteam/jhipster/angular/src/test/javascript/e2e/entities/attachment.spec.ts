import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Attachment e2e test', () => {

    let navBarPage: NavBarPage;
    let attachmentDialogPage: AttachmentDialogPage;
    let attachmentComponentsPage: AttachmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Attachments', () => {
        navBarPage.goToEntity('attachment');
        attachmentComponentsPage = new AttachmentComponentsPage();
        expect(attachmentComponentsPage.getTitle())
            .toMatch(/bprApp.attachment.home.title/);

    });

    it('should load create Attachment dialog', () => {
        attachmentComponentsPage.clickOnCreateButton();
        attachmentDialogPage = new AttachmentDialogPage();
        expect(attachmentDialogPage.getModalTitle())
            .toMatch(/bprApp.attachment.home.createOrEditLabel/);
        attachmentDialogPage.close();
    });

    it('should create and save Attachments', () => {
        attachmentComponentsPage.clickOnCreateButton();
        attachmentDialogPage.setCreationDateInput(12310020012301);
        expect(attachmentDialogPage.getCreationDateInput()).toMatch('2001-12-31T02:30');
        attachmentDialogPage.setDescriptionInput('description');
        expect(attachmentDialogPage.getDescriptionInput()).toMatch('description');
        attachmentDialogPage.attachmentTypeSelectLastOption();
        attachmentDialogPage.save();
        expect(attachmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AttachmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-attachment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AttachmentDialogPage {
    modalTitle = element(by.css('h4#myAttachmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    creationDateInput = element(by.css('input#field_creationDate'));
    descriptionInput = element(by.css('input#field_description'));
    attachmentTypeSelect = element(by.css('select#field_attachmentType'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCreationDateInput = function(creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    };

    getCreationDateInput = function() {
        return this.creationDateInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setAttachmentTypeSelect = function(attachmentType) {
        this.attachmentTypeSelect.sendKeys(attachmentType);
    };

    getAttachmentTypeSelect = function() {
        return this.attachmentTypeSelect.element(by.css('option:checked')).getText();
    };

    attachmentTypeSelectLastOption = function() {
        this.attachmentTypeSelect.all(by.tagName('option')).last().click();
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
