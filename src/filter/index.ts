import {FilterModel} from "ag-grid-community/dist/lib/interfaces/iFilter";
import {
    AdvancedFilterModel
} from "ag-grid-community/dist/lib/interfaces/advancedFilterModel";
import {convertNumberFiler} from "./number";
import {convertTextFiler} from "./text";
import {convertJoinFilter} from "./join";
import {IServerSideGetRowsRequest} from "ag-grid-community/dist/lib/interfaces/iServerSideDatasource";





export function whereFragment(request: IServerSideGetRowsRequest): string {
    if (!request.filterModel) return "";

    const filters = convertFilterImpl(request.filterModel);
    if (!filters) return "";

    return ` WHERE ${filters} `
}


export function convertFilterImpl(model: FilterModel | AdvancedFilterModel): string | undefined {
    return convertNumberFiler(model)
        ?? convertTextFiler(model)
        ?? convertJoinFilter(model)
        ?? convertNumberFiler(model);
}