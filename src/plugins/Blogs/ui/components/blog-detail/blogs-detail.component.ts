import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Asset,
  BaseDetailComponent,
  DataService,
  NotificationService,
  ServerConfigService,
} from "@vendure/admin-ui/core";
import { Observable, of } from "rxjs";
import { filter, mapTo } from "rxjs/operators";
import { Blog, CreateBlogInput, UpdateBlogInput } from "../../generated-types";
import { ADD_BLOG, UPDATE_BLOG } from "./blogs-graphql";

export interface SelectedAssets {
  assets?: Asset[];
  featuredAsset?: Asset;
}

@Component({
  selector: "vdr-blogs-detail",
  templateUrl: "./blogs-detail.component.html",
  styleUrls: ["./blogs-detail.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BlogDetailComponent
  extends BaseDetailComponent<any>
  implements OnInit
{
  detailForm: FormGroup;
  assetChanges: SelectedAssets = {};
  blogImage: any = {};

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
      name: ["", Validators.required],
      metaName: ["", Validators.required],
      type: [""],
      slug: [""],
      sortDescription: ["", Validators.required],
      body: ["", Validators.required],
      published: [false],
    });
  }

  ngOnInit(): void {
    this.init();
  }

  create(): void {
    if (!this.detailForm) {
      return;
    }
    const formValue = this.detailForm.value;
    const blogBody: CreateBlogInput = {
      name: formValue.name,
      metaName: formValue.metaName,
      type: formValue.type,
      slug: formValue.slug,
      image: this.assetChanges?.featuredAsset?.id,
      sortDescription: formValue.sortDescription,
      body: formValue.body,
      published: formValue.published,
    };
    this.dataService.mutate<any, any>(ADD_BLOG, { input: blogBody }).subscribe(
      (data) => {
        this.notificationService.success("common.notify-create-success", {
          entity: "Blog",
        });
        this.assetChanges = {};
        this.detailForm.markAsPristine();
        this.changeDetector.markForCheck();
        this.router.navigate(["../", data.addBlog.id], {
          relativeTo: this.route,
        });
      },
      () => {
        this.notificationService.error("common.notify-create-error", {
          entity: "Blog",
        });
      }
    );
  }

  assetsChanged(): boolean {
    return !!Object.values(this.assetChanges).length;
  }

  save(): void {
    this.saveChanges()
      .pipe(filter((result) => !!result))
      .subscribe(
        () => {
          this.detailForm.markAsPristine();
          this.changeDetector.markForCheck();
          this.notificationService.success("common.notify-update-success", {
            entity: "Blog",
          });
        },
        () => {
          this.notificationService.error("common.notify-update-error", {
            entity: "Blog",
          });
        }
      );
  }

  private saveChanges(): Observable<boolean> {
    if (this.detailForm.dirty || this.assetsChanged()) {
      const formValue = this.detailForm.value;
      const input: UpdateBlogInput = {
        id: parseInt(this.id),
        name: formValue.name,
        metaName: formValue.metaName,
        type: formValue.type,
        slug: formValue.slug,
        image: this.assetsChanged() ? this.assetChanges?.featuredAsset?.id ? this.assetChanges?.featuredAsset?.id : null : undefined,
        sortDescription: formValue.sortDescription,
        body: formValue.body,
        published: formValue.published,
      };
      return this.dataService
        .mutate<any, any>(UPDATE_BLOG, {
          input,
        })
        .pipe(mapTo(true));
    } else {
      return of(false);
    }
  }

  protected setFormValues(entity: Blog): void {
    if (entity.image) this.blogImage = entity.image;
    this.detailForm.patchValue({
      name: entity.name,
      metaName: entity.metaName,
      type: entity.type,
      slug: entity.slug,
      sortDescription: entity.sortDescription,
      body: entity.body,
      published: entity.published,
    });
  }
}
