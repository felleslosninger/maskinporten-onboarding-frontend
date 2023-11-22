import React, { useState } from "react";
import { ApiScopes } from "../../../types/api";
import {
  Button,
  Heading,
  Pagination, Search,
  Textfield,
} from "@digdir/design-system-react";
import PublicScopeResult from "./PublicScopeResult";
import { PlusIcon } from "@navikt/aksel-icons";
import styles from "./styles.module.scss";

interface Props {
  scopeList: ApiScopes;
  resultsPerPage: number;
  env: string;
}

function PublicScopes(props: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showList, setShowList] = useState(false);
  const [filteredList, setFilteredList] = useState(props.scopeList);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * props.resultsPerPage,
    currentPage * props.resultsPerPage,
  );
  const totalPages = Math.ceil(filteredList.length / props.resultsPerPage);

  const onPagination = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value.toLowerCase();
    const list = props.scopeList.filter(
      (scope) => scope.name.search(query) >= 0,
    );
    setFilteredList(list);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      {!showList && (
        <Button
          variant={"tertiary"}
          size={"large"}
          onClick={() => setShowList(true)}
        >
          <PlusIcon />
          Legg til en offentlig tilgang
        </Button>
      )}
      {showList && (
        <>
          <div className={styles.filterbox}>
            <Heading size={"small"} spacing>
              Velg tilgangen du vil legge til
            </Heading>
            <Search onChange={onSearch}
            />
          </div>
          <div className={styles.results}>
            {paginatedList.map((scope) => (
              <PublicScopeResult
                key={scope.name}
                scope={scope}
                env={props.env}
              />
            ))}
            <Pagination
              nextLabel={"Neste"}
              previousLabel={"Forrige"}
              className={styles.pagination}
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={onPagination}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PublicScopes;
