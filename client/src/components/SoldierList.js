import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/action-creators/registryList_action';
import * as editActions from '../redux/action-creators/editRegistryList_action';
import * as addActions from '../redux/action-creators/addRegistryList_action';
import '../CSS/index.css';

class SoldierList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };

         this.loadRef = React.createRef();

    }

   

    handleSearchQuery = e => {
        const { shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, screenType, screen_id } = this.props.registryList;
        const newScrollDown = 1
        this.setState({ searchQuery: e.target.value });
        let newSearchQuery = e.target.value !== '' ? e.target.value : '*';
        this.props.searchSoldierList(shouldSkipRow, rowLimit, newScrollDown, sortBy, orderBy, newSearchQuery, screenType, screen_id)

    }

    handleResetButton = () => {
        const { shouldSkipRow, rowLimit, orderBy, screenType, screen_id } = this.props.registryList;
        this.setState({ searchQuery: '' })
        this.props.searchSoldierList(shouldSkipRow, rowLimit, 1, '*', orderBy, '*', '*', '*')
    }

    handleEditButton = (_id) => {
        console.log(`in handleEditButton ${JSON.stringify(this.props.history)}`);
        this.props.fetchTheSoldier(_id, this.props.history);
        //this.props.clearAll();

    }

handleSortBy = inputType => {
    const { shouldSkipRow, sortBy, orderBy, rowLimit, searchQuery, screenType, screen_id } = this.props.registryList;
    let newSortBy = sortBy;
    let newOrderBy = orderBy;
    let newScrollDown = 1;

    if (newSortBy !== inputType) {
        newSortBy = inputType;
        newOrderBy = 1
    } else if (newSortBy === inputType && newOrderBy === 1) {
        newOrderBy = -1
    } else {
        newSortBy = '*';
        newOrderBy = 0
    }

    this.props.searchSoldierList(shouldSkipRow, rowLimit, newScrollDown, newSortBy, newOrderBy, searchQuery, screenType, screen_id)

}

handleEmail = (email) => {
    window.location.href = `mailto:${email}`
}

handlePhoneCall = (number) => {
    window.location.href = `tel:${number}`
}

handleDeleteButton = (_id) => {
    const {rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id} = this.props.registryList;
    const shouldSkipRow = false;
    this.props.deleteSoldierList(_id, shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id)
}

handleScreenSoldiers = (newScreenType, newScreen_id) => {
    const { shouldSkipRow, sortBy, orderBy, rowLimit, scrollDown, searchQuery } = this.props.registryList;
    this.props.searchSoldierList(true, rowLimit, 1, '*', 0, '*', newScreenType, newScreen_id)

}

    handleAddSolider = () => {
this.props.fetchAvaiSuperior(this.props.history)
    }

    dateGenerator = date => {
        const theMonth = date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const theDate = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        const theYear = date.getFullYear();
        return (`${theMonth}/${theDate}/${theYear}`)
    }

    handleScroll = () => {
        const { isLoading, fetchedAll, shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id } = this.props.registryList;
        const scroller = this.loadRef.current;
        if (scroller.scrollHeight - scroller.scrollTop === scroller.clientHeight && !fetchedAll) {
            const newScrollDown = scrollDown + 1;
        this.props.fetchSoldierList(shouldSkipRow, rowLimit, newScrollDown, sortBy, orderBy, searchQuery, screenType, screen_id)

        }
    }



    componentDidMount() {
        const { isLoading, fetchedAll, shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id } = this.props.registryList;
        this.props.fetchSoldierList(shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id)
    }

    componentWillUnmount() {
        console.log(this.lastSoldier);
        this.props.clearAll();
    }


    render() {
        const { searchQuery } = this.state;
        return (
            <>
            <div  >
                <div>
                    <h3>US Army Personnel Registry</h3>
                </div>
                <div>
                    <input value={searchQuery} onChange={e => this.handleSearchQuery(e)} />
                    <button onClick={() => this.handleResetButton()}>Reset</button>
                    <button onClick={this.handleAddSolider}>New Soldier</button>
                </div>
                <div className='scroller' ref={this.loadRef} onScroll={this.handleScroll}>
                <table>
                    <thead>
                        <tr>
                            <td>Avarar</td>
                            <td onClick={() => this.handleSortBy('name')}>Name</td>
                            <td onClick={() => this.handleSortBy('sex')}>Sex</td>
                            <td onClick={() => this.handleSortBy('rank')}>Rank</td>
                            <td onClick={() => this.handleSortBy('startDate')}>Start Date</td>
                            <td onClick={() => this.handleSortBy('phone')}>Phone</td>
                            <td onClick={() => this.handleSortBy('email')}>Email</td>
                            <td>Superior</td>
                            <td># of D.S.</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.registryList.soldierList.map((data, index) => {
                            return (
                                <tr key={data._id}>
                                    <td> <img className='photo' src={`http://localhost:8800/${data.photoUrl}`} /> </td>
                                    <td> {data.name} </td>

                                    <td> {data.sex} </td>
                                    <td> {data.rank} </td>
                                    <td> {this.dateGenerator(new Date(data.startDate))} </td>
                                    <td onClick={() => this.handlePhoneCall(data.phone)}> {data.phone} </td>
                                    <td onClick={() => this.handleEmail(data.email)}> {data.email} </td>
                                  <td onClick={() => this.handleScreenSoldiers('_id', data.superior_id._id)}> {data.superior_id ? data.superior_id.name : null} </td>
                                    <td onClick={() => this.handleScreenSoldiers('superior_id', data._id)}>  {data.subo ? (data.subo.length? data.subo.length : 1 ) : null} </td>
                                    <td onClick={() => this.handleEditButton(data._id, this.props.history)}> edit </td>
                                    <td onClick={() => this.handleDeleteButton(data._id)}> delete </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
               {this.props.isLoading? <div > Loading... </div> : null } 
</div>
            </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        registryList: state.registryList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSoldierList: (shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id) => {
            dispatch(actions.fetchSoldierList(shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id))
        },

        searchSoldierList: (shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id) => {
            dispatch(actions.searchSoldierList(shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id))
        },

        // searchSuperior: (_id) => {
        //     dispatch(actions.searchSuperior(_id))
        // },


        fetchTheSoldier: (_id, history) => {
            dispatch(editActions.fetchTheSoldier(_id, history))
        },
        fetchAvaiSuperior: (history) => {
            dispatch(addActions.fetchAvaiSuperior(history))
        },
        deleteSoldierList: (_id, shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id) => {
            dispatch(actions.deleteSoldierList(_id, shouldSkipRow, rowLimit, scrollDown, sortBy, orderBy, searchQuery, screenType, screen_id))
        },
        clearAll: () => {
            dispatch(actions.clearAll())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoldierList)

