import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DataService, BaseEntityResolver } from "@vendure/admin-ui/core";
import { GET_REAL_ESTATE } from "./detail-resolver.graphql";

import {
  GetRealEstateQuery,
  RealEstateCustomFieldsFragment,
  GetRealEstateQueryVariables,
} from "../../../generated-types";

@Injectable()
export default class RealEstateDetailResolver extends BaseEntityResolver<RealEstateCustomFieldsFragment> {
  constructor(router: Router, dataService: DataService) {
    super(
      router,
      {
        __typename: "RealEstate" || "Blogs",
        id: "",
        projectName: "",
        descriptions: "",
        price: "",
        address: "",
        createdAt: "",
        updatedAt: "",
      },
      (id) =>
        dataService
          .query<GetRealEstateQuery, GetRealEstateQueryVariables>(
            GET_REAL_ESTATE,
            {
              id: id,
            }
          )
          .mapStream((data) => data.RealEstate)
    );
  }
}
