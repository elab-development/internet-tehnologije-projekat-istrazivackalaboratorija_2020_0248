import { useEffect, useState } from "react";

function useSearch(items, searchQuery) {
    const [filteredItems, setFilteredItems] = useState(items);
  
    useEffect(() => {
      const searchLower = searchQuery.toLowerCase();
      const results = items.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        (item.authors && item.authors.toLowerCase().includes(searchLower)) ||
        (item.abstract && item.abstract.toLowerCase().includes(searchLower)) ||
        (item.keywords && item.keywords.toLowerCase().includes(searchLower))
      );
      setFilteredItems(results);
    }, [items, searchQuery]);
  
    return filteredItems;
  }
  
  export default useSearch;
  