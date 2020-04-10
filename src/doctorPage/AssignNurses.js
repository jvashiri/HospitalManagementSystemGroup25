import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { SidebarComponent } from './SidebarComponent';
import { HeaderComponent } from './HeaderComponent';
import '../App.css';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 30
    }
});

class AssignNurses extends React.Component {

    state = { selectedItem: 'Upcoming/Past Appointments',
    nurses: [],
    patients: [],
    date: new Date(),
    nurseName: {
      name:'',
    } ,
    appointmentName: {
      name:'',
      notesFromDoctor: '',
    } };

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        document.title = "Patient";
        this.getNurses();
        this.getPatients();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    getNurses = _ =>
    {
      fetch(`http://localhost:4000/HospitalManagementSystem/getNurses`)
      .then(response => response.json())
      .then(response => this.setState({nurses: response.data}))
      .catch(err => console.error(err))
    }

    getPatients = _ =>
    {
      fetch(`http://localhost:4000/HospitalManagementSystem/getPatientsForDoctors?doctorName=${localStorage.getItem("usernameForDoctor")}`)
      .then(response => response.json())
      .then(response => this.setState({patients: response.data}))
      .catch(err => console.error(err))
    }

    onChange = date => this.setState({ date })
    resize = () => this.forceUpdate();

  deleteAppointment(e)
  {
    var response = window.confirm(`Are you sure you want to cancel the appointment?` );
    if(response == true)
    {
        fetch(`http://localhost:4000/HospitalManagementSystem/deleteAppointment?appointment=${e.target.value}`)
        .then((response) => {return response.json()})
        .then((response) => {

        })
          .catch(err => console.error(err));

        window.location.href = 'http://localhost:3000/AssignNurses';
    }

    else
    {

    }

  }

    /*
    Display results from database on webpage.
    */
    renderNurses = ({email, userType}) =>
    <option value={email}>{email} </option>;

    /*
    Display results from database on webpage.
    */
    renderAppointment = ({doctorName, setBy, appointments}) =>
    <option value={appointments}>{appointments.replace(doctorName, "with ")} patient {setBy}</option>;

      assignNurse = _ =>
      {
        const { appointmentName, nurseName } = this.state;

        if(nurseName.name === '' || appointmentName.name === '')
        {
            alert("Please choose a nurse to assign to an appointment.");
        }
        else{

        var response = window.confirm(`Are you sure to assign ${nurseName.name} to the selected appointment?`);
        if(response == true)
        {
            fetch(`http://localhost:4000/HospitalManagementSystem/assignNurse?nurseName=${nurseName.name}&appointments=${appointmentName.name}&notesForNurse=${appointmentName.notesFromDoctor}`)
            .then((response) => {return response.json()})
              .catch(err => console.error(err));
              alert('Nurse successfully assigned!');
              window.location.href = 'http://localhost:3000/AssignNurses';  
        }
      }

      }

    render() {
        const { selectedItem, nurses, patients, nurseName, appointmentName} = this.state;
        return (
            <Row className={css(styles.container)}>
                <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
                <Column flexGrow={1} className={css(styles.mainBlock)}>
                    <HeaderComponent title={selectedItem} />
                    <div>
                    Assign Nurse 
                    <select id="nurses"
                    onChange={e => this.setState({ nurseName: {...nurseName, name: e.target.value}})}>
                    <option value="" selected disabled hidden>Choose Nurse</option>
                        {nurses.map(this.renderNurses)}
                    </select>
                    to
                    <select id="patients"
                    onChange={e => this.setState({ appointmentName: {...appointmentName, name: e.target.value}})}>
                    <option value="" selected disabled hidden>Choose Appointment</option>
                        {patients.map(this.renderAppointment)}
                    </select>
            <div className={css(styles.padding10)}></div>
            <div>
              <label for="notesFromDoctor">Notes for Nurse Regarding Appointment</label>
              <textarea
                type="text"
                placeholder="Notes"
                value={appointmentName.notesFromDoctor}
                onChange={e => this.setState({ appointmentName: { ...appointmentName, notesFromDoctor: e.target.value } })}
                name="notesFromDoctor" required />
              </div>
                    <button onClick={this.assignNurse} type="submit">Assign Nurse</button>

                    </div>
                </Column>
            </Row>
        );
    }
}

export default AssignNurses
