import React, { useState } from 'react';

const CollectionContext = React.createContext({
  collections: [],
  setCollecionts: () => {},
});

export const CollectionContextProvider = (props) => {
  const [fetchedCollections, setFetchedCollections] = useState(null);
  const setCollectionHadler = (data) => {
    setFetchedCollections(data)
  }
  const contextValue = {
    collections: fetchedCollections,
    setCollecionts: setCollectionHadler,
  };

  return (
    <CollectionContext.Provider value={contextValue}>
      {props.children}
    </CollectionContext.Provider>
  );
};

export default CollectionContext;
