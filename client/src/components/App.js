import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import SoldierList from './SoldierList';
import EditSoldierList from './EditSoldierList';
import AddSoldierList from './addSoldierList';


const App = () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/soldierList' component={SoldierList} />
            <Route path='/editSoldierList' component={EditSoldierList} />
            <Route path='/addSoldierList' component={AddSoldierList} />
            {/* <Route path='/test' component={Test} /> */}
        </Switch>
        </BrowserRouter>
    )
}

export default App