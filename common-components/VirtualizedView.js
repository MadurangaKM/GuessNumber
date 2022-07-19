import React from "react";
import { FlatList } from "react-native";

export default function VirtualizedView(props) {
  return (
    <FlatList
      style={{...props.style}}
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}
