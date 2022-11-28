import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BaseListComponent,
  DataService,
  ModalService,
  NotificationService,
} from "@vendure/admin-ui/core";
import { delay, debounceTime, takeUntil, switchMap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { DELETE_BLOG, GET_BLOGS } from "./blogs-list.graphql";
import { SortOrder } from "@vendure/common/lib/generated-types";
import { marker as _ } from "@biesbjerg/ngx-translate-extract-marker";
import { EMPTY } from "rxjs";

@Component({
  selector: "vdr-blogs-list",
  templateUrl: "./blogs-list.component.html",
  styleUrls: ["./blogs-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsListComponent
  extends BaseListComponent<any, any, any>
  implements OnInit
{
  filterTermControl = new FormControl("");

  constructor(
    private dataService: DataService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(router, route);
    super.setQueryFn(
      (...args: any[]) => {
        return this.dataService.query<any>(GET_BLOGS, args);
      },
      (data) => data.blogs,
      (skip, take) => {
        return {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          options: {
            skip,
            take,
            sort: {
              createdAt: SortOrder.DESC,
            },
            ...(this.filterTermControl.value
              ? {
                  filter: {
                    name: {
                      contains: this.filterTermControl.value,
                    },
                  },
                }
              : {}),
          },
        };
      }
    );
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.filterTermControl.valueChanges
      .pipe(debounceTime(250), takeUntil(this.destroy$))
      .subscribe(() => this.refresh());
  }

  deleteBlog(blogId: string): void {
    this.modalService
      .dialog({
        title: _("blog.delete"),
        buttons: [
          { type: "secondary", label: _("common.cancel") },
          { type: "danger", label: _("common.delete"), returnValue: true },
        ],
      })
      .pipe(
        switchMap((res) =>
          res ? this.dataService.mutate(DELETE_BLOG, { id: blogId }) : EMPTY
        ),
        delay(500)
      )
      .subscribe(
        () => {
          this.notificationService.success(_("common.notify-delete-success"), {
            entity: "Blog",
          });
          this.refresh();
        },
        (err) => {
          this.notificationService.error(_("common.notify-delete-error"), {
            entity: "Blog",
          });
        }
      );
  }
}
