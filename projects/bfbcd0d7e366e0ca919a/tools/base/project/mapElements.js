
  // ---------- import Packs
import React from 'react';

export const mapElements = (list, args) => {
  const condCall = list.flatMap(i => i).length > 0;
  const renderList = () =>
    list.map((Item, idx) => (
      <React.Fragment key={idx}>{Item(args)}</React.Fragment>
    ));
  return condCall ? renderList() : <></>;
};
  