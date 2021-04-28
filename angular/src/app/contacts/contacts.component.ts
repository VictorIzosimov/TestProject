import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  ContactsServiceProxy,
  ContactDto,
  ContactDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateContactDialogComponent } from './create-contact/create-contact-dialog.component';
import { EditContactDialogComponent } from './edit-contact/edit-contact-dialog.component';

class PagedcontactsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './contacts.component.html',
  animations: [appModuleAnimation()]
})
export class contactsComponent extends PagedListingComponentBase<ContactDto> {
  contacts: ContactDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _contactsService: ContactsServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedcontactsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._contactsService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ContactDtoPagedResultDto) => {
        this.contacts = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(contact: ContactDto): void {
    abp.message.confirm(
      this.l('Delete this contact?', contact.contactName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._contactsService
            .delete(contact.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  createcontact(): void {
    this.showCreateOrEditcontactDialog();
  }

  editcontact(contact: ContactDto): void {
    this.showCreateOrEditcontactDialog(contact.id);
  }

  showCreateOrEditcontactDialog(id?: number): void {
    let createOrEditcontactDialog: BsModalRef;
    if (!id) {
      createOrEditcontactDialog = this._modalService.show(
        CreateContactDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditcontactDialog = this._modalService.show(
        EditContactDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditcontactDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
