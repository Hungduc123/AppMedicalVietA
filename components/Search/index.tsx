import React from "react";
import { View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { styles } from "../../constant/styles";

const Search = (extraData: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query: any) => setSearchQuery(query);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Nhập từ khóa"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
};

export default Search;
