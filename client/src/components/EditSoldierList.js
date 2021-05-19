import React from 'react';
import { connect } from 'react-redux';
import * as editActions from '../redux/action-creators/editRegistryList_action'

class EditSoldierList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.theSoldier._id,
            name: this.props.theSoldier.name,
            rank: this.props.theSoldier.rank,
            sex: this.props.theSoldier.sex,
            startDate: new Date(this.props.theSoldier.startDate),
            phone: this.props.theSoldier.phone,
            email: this.props.theSoldier.email,
            photoUrl: this.props.theSoldier.photoUrl,
            superior: this.props.theSoldier.superior_id ? this.props.theSoldier.superior_id : null,
            avaiSuperior: this.props.avaiSuperior,
            photoFile: null,

            error_name: false,
            error_rank: false,
            error_sex: false,
            error_startDate: false,
            error_phone: false,
            error_email: false,
            error_photoFile: true
        }
    }

    errorCheck = (e, type) => {
        const regName = RegExp(/[A-Z][a-z]+\s[A-Z][a-z]+/);
        const regPhone = RegExp(/^\d{10}$/);
        const regEmail = RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        const today = new Date();
        const {name, rank, sex, startDate, phone, email, photoUrl, photoFile} = this.state;
            switch(type) {
        case 'name':
            !regName.test(e.target.value) || e.target.value === ''?  this.setState({error_name: true}) : this.setState({error_name: false});
            break;

            case 'rank':
                e.target.value === ''? this.setState({error_rank: true}) : this.setState({error_rank: false});
                break;
        
                case 'sex':
                    sex === ''? this.setState({error_sex: true}) : this.setState({error_sex: false});
                    break;

            case 'startDate':
                new Date(e.target.value).getTime() <= new Date().getTime()? this.setState({error_startDate: false}) : this.setState({error_startDate: true});
                break;

            case 'phone':
            !regPhone.test(e.target.value) || e.target.value ===''?  this.setState({error_phone: true}) : this.setState({error_phone: false});
            break;

        case 'email':
            !regEmail.test(e.target.value) || e.target.value ===''?  this.setState({error_email: true}) : this.setState({error_email: false});
            break;
        
//             case 'photoFile':
//                 e.target.files[0]? this.setState({error_photoFile: false}) : this.setState({error_photoFile: true});
// break;

                default:
                    break
            }
           
        }

        handleInput = (e, type) => {
            switch (type) {
                case 'name':
                    this.setState({ name: e.target.value });
                    break;
    
                case 'rank':
                    this.setState({ rank: e.target.value })
                    break;
    
                case 'sex':
                    this.setState({ sex: e.target.value })
                    break;
    
                case 'phone':
                    this.setState({ phone: e.target.value })
                    break;
    
                case 'email':
                    this.setState({ email: e.target.value })
                    break;
    
                case 'startDate':
                    this.setState({ startDate: new Date(e.target.value) })
                    break;
    
                case 'photoFile':
                    this.setState({ photoFile: e.target.files[0] })
                    break;
    
                case 'superior':
                    //  console.log(`e.target: ${JSON.stringify(e.target)}`);
                    const _id = e.target.value;
                    console.log(`_id: ${_id}`);
    
                    let newSuperior = this.state.avaiSuperior.find(data => data._id === _id)
                    this.setState({ superior: newSuperior })
                    break;
    
                default:
                    return
            }
            this.errorCheck(e, type)
        }

    handleSaveButton = (e) => {
                e.preventDefault();
                const { _id, name, rank, sex, startDate, phone, email, photoFile, superior} = this.state;
        const formData = new FormData();
        formData.append('photo', photoFile);
 formData.append('name', name);
 formData.append('rank', rank);
 formData.append('sex', sex);
 formData.append('startDate', startDate);
 formData.append('phone', phone);
 formData.append('email', email);
 if (superior) { formData.append('superior_id', superior._id)};

 const config = {headers: {'content-type': 'multipart/form-data'}}


                this.props.updateTheSoldier(_id, formData, config, this.props.history);
                this.props.clearAll();
    }












    render() {
        const { name, rank, sex, startDate, phone, email, photoUrl, superior, avaiSuperior, photoFile,
            error_name, error_rank, error_sex, error_startDate, error_phone, error_email, error_photoFile } = this.state;
        // console.log(`superior ${JSON.stringify(superior)}`);
        //console.log(`rank ${JSON.stringify(rank)}`);
       // console.log(`sex ${JSON.stringify(sex)}`);


        return (
            <div>
                <div>
                    Edit EditSoldierList
</div>

                <br />
                <br />

                <form onSubmit={e => this.handleSaveButton(e)}>
                    <label htmlFor='name'>Name:</label>
                    <input value={name} onChange={(e) => this.handleInput(e, 'name')} name='name' />
                    <p hidden={error_name? false : true}> * please input valid fullname (e.g: Firstname Lastname)</p>

                    <br />
                    <br />

                    <label htmlFor='rank'>Rank:</label>
                    <select name='rank' value={rank} onChange={e => this.handleInput(e, 'rank')}>
                        <option ></option>
                        <option value='General'        >General</option>
                        <option value='Colonel'        >Colonel</option>
                        <option value='Major'          >Major</option>
                        <option value='Captain'        >Captain</option>
                        <option value='Lieutenant'     >Lieutenant</option>
                        <option value='Warrant Officer'>Warrant Officer</option>
                        <option value='Sergeant'       >Sergeant</option>
                        <option value='Corporal'       >Corporal</option>
                        <option value='Specialist'     >Specialist</option>
                        <option value='Private'        >Private</option>
                    </select>
                    <p hidden={error_rank? false : true}> * please select the rank</p>

                    <br />
                    <br />

                    <label htmlFor='gender'>Sex:</label>
                    <input type='radio' value='M' id='Male' name='gender' defaultChecked={sex === 'M' ? true : false} onClick={e => this.handleInput(e, 'sex')} />
                    <label name='gender' htmlFor='Male'> Male </label>
                    <input type='radio' value='F' id='Female' name='gender' defaultChecked={sex === 'F' ? true : false} onClick={e => this.handleInput(e, 'sex')} />
                    <label name='gender' htmlFor='Female'> Female </label>
                    <p hidden={error_sex? false : true}> * please select the sex</p>

                    <br />
                    <br />

                    <label htmlFor='startDate'>Start Date:</label>
                    <input name='startDate' type='date' value={new Date(startDate).toISOString().substr(0, 10)} onChange={e => this.handleInput(e, 'startDate')} />
                    {/* <input value={this.dateGenerator(new Date(startDate))} name='startDate' /> */}
                    <p hidden={error_startDate? false : true}> * please input valid date</p>

                    <br />
                    <br />

                    <label htmlFor='phone'>Phone:</label>
                    <input value={phone} name='phone' onChange={e => { this.handleInput(e, 'phone') }} />
                    <p hidden={error_phone? false : true}> * please input valid 10-digital phone number (e.g: 1234567890)</p>

                    <br />
                    <br />

                    <label htmlFor='email'>Email:</label>
                    <input value={email} name='email' onChange={e => { this.handleInput(e, 'email') }} />
                    <p hidden={error_email? false : true}> * please input valid email address (e.g: mike123.rock@gmail.com)</p>

                    <br />
                    <br />

                    <label htmlFor='superiorExpand'>Superior:</label>


                    {/* <input value={superior ? superior.name : null} name='superior' /> */}
                    <select onChange={e => {
                        this.handleInput(e, 'superior')
                    }}
                        name='superiorExpand'>


                        <option value='' selected={superior ? false : true}> </option>

                        {avaiSuperior.map(data => {
                            return (

                                <option value={data._id} selected={superior ? superior.name === data.name : false} key={data._id}>{data.name}</option>
                            )
                        })}
                    </select>

                    <br />
                    <br />
                    <img className='photo' src={photoFile? URL.createObjectURL(photoFile) : `http://localhost:8800/${photoUrl}`} />
                    <label htmlFor='photo'>Photo:</label>
                    <input type='file' name='photo' onChange={e => this.handleInput(e, 'photoFile')} />
                   {/* <p hidden={photoFile? true : false}> * please update the soldier's photo</p> */}

                </form>
                <button type='submit' 
                        onClick={this.handleSaveButton}
                         disabled={!error_name && 
                            !error_rank &&
                            !error_sex &&
                            !error_startDate &&
                            !error_phone &&
                            !error_email &&
                            name !== '' &&
                            rank !== '' &&
                            sex !== '' &&
                            phone !== null && 
                            email !== ''? 
                            false : true}> save </button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        theSoldier: state.editRegistryList.theSoldier,
        avaiSuperior: state.editRegistryList.avaiSuperior
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTheSoldier: _id => {
            dispatch(editActions.fetchTheSoldier(_id))
        },
        updateTheSoldier: (_id, formData, config, history) => {
            dispatch(editActions.updateTheSoldier(_id, formData, config, history))
        },
        clearAll: () => {
            dispatch(editActions.clearAll())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditSoldierList)