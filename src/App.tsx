import React, {FunctionComponent} from 'react';
import {Provider} from 'mobx-react';
import List from "./components/list/List";
import ListStore from "./stores/listStore";

const App: FunctionComponent = () => {
  return (
    <Provider listStore={ListStore.create()}>
      <List/>
    </Provider>
  );
}

export default App;
