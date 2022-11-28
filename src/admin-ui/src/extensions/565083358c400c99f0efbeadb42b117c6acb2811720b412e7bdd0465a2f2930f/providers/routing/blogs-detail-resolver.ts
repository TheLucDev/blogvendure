import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseEntityResolver } from '@vendure/admin-ui/core';

import { GET_BLOG } from './blogs-detail-resolver.graphql';


@Injectable()
export class BlogDetailResolver extends BaseEntityResolver<any> {
    constructor(router: Router, dataService: DataService) {
        super(
            router,
            {
                id: '',
                createdAt: new Date(),
                name: '',
            },
            (id) =>
                dataService
                    .query<any, any>(GET_BLOG, { id })
                    .mapStream((data) => data.blog),
        );
    }
}
