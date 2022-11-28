import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, NotificationService, ModalService  } from '@vendure/admin-ui/core';
import { Apollo } from 'apollo-angular';

import { EMPTY } from 'rxjs';
import { debounceTime, takeUntil, switchMap } from 'rxjs/operators';

import {
    GetAllRealEstatesQuery,
    RealEstateCustomFields,
    GetAllRealEstatesQueryVariables,
    DeleteRealEstate,
    SortOrder
} from '../../generated-types';

import { GET_ALL_REAL_ESTATE, DELETE_REAL_ESTATE } from './list.component.graphql';

@Component({
    selector: 'all-feedbacks-list',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListComponent extends BaseListComponent<
    GetAllRealEstatesQuery,
    RealEstateCustomFields.Fragment,
    GetAllRealEstatesQueryVariables
    > implements OnInit {
    searchTerm = new FormControl('');
    RealEstates: any;

    constructor(
        private dataService: DataService,
        private modalService: ModalService,
        private notificationService: NotificationService,
        private apollo: Apollo,
        router: Router,
        route: ActivatedRoute,
    ) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => this.dataService.query(GET_ALL_REAL_ESTATE,args),
            (data) => data.RealEstates,
            (skip, take) => ({
                options: {
                    skip,
                    take,
                    sort: {
                        updatedAt: SortOrder.Desc,
                    },
                },
            }),
        );
    }

    ngOnInit() {
        super.ngOnInit();
        this.searchTerm.valueChanges
            .pipe(
                debounceTime(250),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                this.filtertable();
                //this.refresh();
            });
    }


    filtertable() {
        let input = this.searchTerm.value;
        let filter = input.toUpperCase();
        let table = <HTMLElement> document.querySelector("#datatable >.table > tbody");
        let tr = table.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {

            for(let j=0;j<4;j++){

                let td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    let txtValue = td.innerHTML;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                        break;
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

        }
    }

    deleteRealEstate(id: string) {
        this.modalService
            .dialog({
                title: _('vdr-feedback-plugin.confirm-delete-feedback'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response => (response ? this.dataService.mutate<DeleteRealEstate.Mutation,DeleteRealEstate.Variables>(DELETE_REAL_ESTATE,{"input":id}) : EMPTY)),
            )
            .subscribe(
                () => {
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'RealEstate',
                    });
                    this.refresh();
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'RealEstate',
                    });
                },
            );
    }
}