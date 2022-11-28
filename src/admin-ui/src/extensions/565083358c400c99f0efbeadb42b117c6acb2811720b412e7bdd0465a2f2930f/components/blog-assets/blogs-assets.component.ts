import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ViewportRuler } from "@angular/cdk/overlay";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  Output,
  OnInit,
} from "@angular/core";
import { CollectionDetailComponent } from "@vendure/admin-ui/catalog";
import {
  Asset,
  AssetPickerDialogComponent,
  AssetPreviewDialogComponent,
  ModalService,
  Permission,
} from "@vendure/admin-ui/core";
import { unique } from "@vendure/common/lib/unique";

export interface AssetChange {
  assets: Asset[];
  featuredAsset: Asset | undefined;
}

@Component({
  selector: "vdr-blog-assets",
  templateUrl: "./blogs-assets.component.html",
  styleUrls: ["./blogs-assets.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BlogsAssetsComponent implements OnInit {
  @Input("assets") set assetsSetter(val: Asset[]) {
    // create a new non-readonly array of assets
    this.assets = val ? val.slice() : [];
  }

  @Input() featuredAsset: Asset | undefined;
  @HostBinding("class.compact")
  @Input()
  compact = false;
  @Output() change = new EventEmitter<AssetChange>();

  public assets: Asset[] = [];

  private readonly updateCollectionPermissions = [
    Permission.UpdateCatalog,
    Permission.UpdateCollection,
  ];
  private readonly updateProductPermissions = [
    Permission.UpdateCatalog,
    Permission.UpdateProduct,
  ];

  get updatePermissions(): Permission[] {
    if (this.collectionDetailComponent) {
      return this.updateCollectionPermissions;
    } else {
      return this.updateProductPermissions;
    }
  }

  constructor(
    private modalService: ModalService,
    private changeDetector: ChangeDetectorRef,
    private viewportRuler: ViewportRuler,
    @Optional() private collectionDetailComponent?: CollectionDetailComponent
  ) {}

  ngOnInit(): void {}

  selectAssets() {
    this.modalService
      .fromComponent(AssetPickerDialogComponent, {
        size: "xl",
      })
      .subscribe((result) => {
        if (result && result.length) {
          this.assets = unique(this.assets.concat(result), "id");
          this.featuredAsset = result[result.length - 1];
          const idFeaturedAsset = this.featuredAsset.id;
          this.assets = this.assets.filter((item)=> item.id == idFeaturedAsset);
          this.emitChangeEvent(this.assets, this.featuredAsset);
          this.changeDetector.markForCheck();
        }
      });
  }

  setAsFeatured(asset: Asset) {
    this.featuredAsset = asset;
    this.emitChangeEvent(this.assets, asset);
  }

  isFeatured(asset: Asset): boolean {
    return !!this.featuredAsset && this.featuredAsset.id === asset.id;
  }

  previewAsset(asset: Asset) {
    this.modalService
      .fromComponent(AssetPreviewDialogComponent, {
        size: "xl",
        closable: true,
        locals: { asset },
      })
      .subscribe();
  }

  removeAsset(asset: Asset) {
    this.assets = this.assets.filter((a) => a.id !== asset.id);
    if (this.featuredAsset && this.featuredAsset.id === asset.id) {
      this.featuredAsset = this.assets.length > 0 ? this.assets[0] : undefined;
    }
    this.emitChangeEvent(this.assets, this.featuredAsset);
  }

  private emitChangeEvent(assets: Asset[], featuredAsset: Asset | undefined) {
    this.change.emit({
      assets,
      featuredAsset,
    });
  }

  dropListDropped(event: CdkDragDrop<number>) {
    moveItemInArray(
      this.assets,
      event.previousContainer.data,
      event.container.data
    );
    this.emitChangeEvent(this.assets, this.featuredAsset);
  }
}
