import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BaseDetailComponent,
  DataService,
  NotificationService,
  ServerConfigService,
} from "@vendure/admin-ui/core";
import { Observable, of } from "rxjs";
import { filter, mapTo } from "rxjs/operators";

import {
  RealEstateCustomFieldsFragment,
  RealEstateAddInput,
  RealEstateUpdateInput,
  UpdateRealEstate,
  CreateRealEstate,
} from "../../generated-types";

import { UPDATE_REAL_ESTATE, CREATE_REAL_ESTATE } from "./detail.graphql";

@Component({
  selector: "real-estate-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailComponent
  extends BaseDetailComponent<RealEstateCustomFieldsFragment>
  implements OnInit, OnDestroy
{
  detailForm: FormGroup;
  which = false;

  constructor(
    route: ActivatedRoute,
    router: Router,
    serverConfigService: ServerConfigService,
    private formBuilder: FormBuilder,
    protected dataService: DataService,
    private changeDetector: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    super(route, router, serverConfigService, dataService);

    this.detailForm = this.formBuilder.group({
      projectName: "",
      address: "",
      price: 0,
      descriptions: "",
    });
  }

  ngOnInit() {
    ``;
    if (this.router.url != "/extensions/blogs/create") {
      this.which = false;
      this.init();
    } else {
      this.which = true;
    }
  }

  ngOnDestroy() {
    this.destroy();
  }

  create() {
    this.addNew()
      .pipe(filter((result) => !!result))
      .subscribe(
        () => {
          this.detailForm.markAsPristine();
          this.changeDetector.markForCheck();
          this.notificationService.success("common.notify-create-success", {
            entity: "RealEstate",
          });
        },
        () => {
          this.notificationService.error("common.notify-create-error", {
            entity: "RealEstate",
          });
        }
      );
  }

  save() {
    this.saveChanges()
      .pipe(filter((result) => !!result))
      .subscribe(
        () => {
          this.detailForm.markAsPristine();
          this.changeDetector.markForCheck();
          this.notificationService.success("common.notify-update-success", {
            entity: "RealEstate",
          });
        },
        () => {
          this.notificationService.error("common.notify-update-error", {
            entity: "RealEstate",
          });
        }
      );
  }

  private addNew(): Observable<boolean> {
    if (this.detailForm.dirty) {
      const formValue = this.detailForm.value;
      const input: RealEstateAddInput = {
        projectName: formValue.projectName || "None",
        price: formValue.price || "None",
        descriptions: formValue.descriptions || "None",
        address: formValue.address || "None",
      };
      return this.dataService
        .mutate<CreateRealEstate.Mutation, CreateRealEstate.Variables>(
          CREATE_REAL_ESTATE,
          {
            input,
          }
        )
        .pipe(mapTo(true));
    } else {
      return of(false);
    }
  }

  private saveChanges(): Observable<boolean> {
    if (this.detailForm.dirty) {
      const formValue = this.detailForm.value;
      const input: RealEstateUpdateInput = {
        id: this.id,
        projectName: formValue.projectName || "None",
        price: formValue.price || 0,
        address: formValue.address || "None",
        descriptions: formValue.descriptions || "None",
      };
      return this.dataService
        .mutate<UpdateRealEstate.Mutation, UpdateRealEstate.Variables>(
          UPDATE_REAL_ESTATE,
          {
            input,
          }
        )
        .pipe(mapTo(true));
    } else {
      return of(false);
    }
  }

  /**
   *
   * @param entity
   * @protected
   */
  protected setFormValues(entity: RealEstateCustomFieldsFragment) {
    let data = <any>{};

    data.projectName = entity.projectName == "None" ? "" : entity.projectName;

    data.address = entity.address == "None" ? "" : entity.address;

    data.price = entity.price || 0;

    data.descriptions =
      entity.descriptions == "None" ? "" : entity.descriptions;

    this.detailForm.patchValue(data);
  }
}
