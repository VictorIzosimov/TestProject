import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ContactsServiceProxy,
  ContactDto,
  PermissionDto,
  ContactEditDto,
    FlatPermissionDto,
    GetContactForEditOutput
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'edit-contact-dialog.component.html'
})
export class EditContactDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  contact = new ContactEditDto();
  permissions: FlatPermissionDto[];
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _contactService: ContactsServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

     ngOnInit(): void {
        this._contactService
            .get(this.id)
            .subscribe((result) => {
                this.contact = result;
            });
     }

  setInitialPermissionsStatus(): void {
    _map(this.permissions, (item) => {
      this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
        item.name
      );
    });
  }

  isPermissionChecked(permissionName: string): boolean {
    return _includes(this.grantedPermissionNames, permissionName);
  }

  onPermissionChange(permission: PermissionDto, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
  }

  getCheckedPermissions(): string[] {
    const permissions: string[] = [];
    _forEach(this.checkedPermissionsMap, function (value, key) {
      if (value) {
        permissions.push(key);
      }
    });
    return permissions;
  }

  save(): void {
    this.saving = true;

    const contact = new ContactDto();
    contact.init(this.contact);

    this._contactService
      .update(contact)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
