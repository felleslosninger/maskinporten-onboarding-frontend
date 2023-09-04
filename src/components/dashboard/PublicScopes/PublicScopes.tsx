import React, {useState} from "react";
import {ApiPublicScopes} from "../../../types/api";
import styles from "./styles.module.scss";
import {Heading, Pagination, TextField} from "@digdir/design-system-react";
import PublicScopeResult from "./PublicScopeResult";



interface Props {
    scopeList: ApiPublicScopes;
    resultsPerPage: number;
    env: string;
}

function PublicScopes(props: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredList, setFilteredList] = useState(props.scopeList);
    const paginatedList = filteredList.slice((currentPage - 1) * props.resultsPerPage, currentPage * props.resultsPerPage);
    const totalPages = Math.ceil(filteredList.length / props.resultsPerPage);

    const onPagination = (page: number) => {
        setCurrentPage(page);
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.currentTarget.value.toLowerCase();
        const list = props.scopeList.filter((scope) => scope.name.search(query) >= 0);
        setFilteredList(list);
        setCurrentPage(1);
    };


    return (
      <div className={styles.container}>
          <div className={styles.header}>
              <Heading size={"small"} spacing>Åpne Scopes</Heading>
          </div>
          <div className={styles.filterbox}>
              <TextField type={"search"}
                         label={"Søk"}
                         onChange={onSearch}
                         className={styles.search}
              />
          </div>
          <div className={styles.results}>
              {paginatedList.map((scope) => (
                  <PublicScopeResult key={scope.name} scope={scope} env={props.env} />
              ))}
              <Pagination nextLabel={"Neste"}
                          previousLabel={"Forrige"}
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onChange={onPagination} />
          </div>
      </div>
    );
}

export default PublicScopes;