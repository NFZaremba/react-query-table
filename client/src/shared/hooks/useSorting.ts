import { useState, useMemo, useEffect } from "react";
import { IData } from "../types";

const useSort = (data: IData[] = []) => {
  const [sortedItems, setSortedItems] = useState(data);
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("asc");

  const onSort = (sortKey: string) => {
    const isAsc = sortBy === sortKey && orderBy === "asc";
    setSortBy(sortKey);
    setOrderBy(isAsc ? "desc" : "asc");
  };

  const sortData = useMemo(
    () => (v1: any, v2: any) => {
      if (!v1 || !v2) return;
      if (sortBy === "id") return v1.id - v2.id;

      return v1[sortBy].toLowerCase().localeCompare(v2[sortBy].toLowerCase());
    },
    [sortBy]
  );

  useEffect(() => {
    console.log(sortBy);
    if (!sortBy) return;
    if (data?.length) {
      setSortedItems((prevSorted) =>
        prevSorted.sort((a, b) =>
          orderBy === "asc" ? sortData(a, b) : sortData(b, a)
        )
      );
    }
  }, [sortBy, orderBy, data, sortData]);

  return {
    sortBy,
    orderBy,
    onSort,
    sortedItems,
  };
};

export default useSort;
