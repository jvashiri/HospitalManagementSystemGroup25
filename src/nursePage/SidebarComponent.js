/*
Importing all necessary components required
*/
import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import MenuItemComponent from '../MenuItemComponent';
import LogoComponent from '../LogoComponent';

import IconBurger from '../icons/icon-burger';
import IconHome from '../icons/health.png';
import IconSchedule from '../icons/schedule.png';
import IconAppointments from '../icons/appointments.png';
import IconLogout from '../icons/logout.png'


/*
Styling the webpage attributes.
*/
const styles = StyleSheet.create({
    burgerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        left: 24,
        top: 34
    },
    container: {
        backgroundColor: '#482acc',
        width: 255,
        paddingTop: 32,
        height: 'calc(100% - 32px)'
    },
    containerMobile: {
        transition: 'left 0.5s, right 0.5s',
        position: 'absolute',
        width: 255,
        height: 'calc(100% - 32px)',
        zIndex: 901
    },
    mainContainer: {
        height: '100%',
        minHeight: '100vh'
    },
    mainContainerMobile: {
        position: 'absolute',
        width: '100vw',
        minWidth: '100%',
        top: 0,
        left: 0
    },
    menuItemList: {
        marginTop: 52
    },
    outsideLayer: {
        position: 'absolute',
        width: '100vw',
        minWidth: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.50)',
        zIndex: 900
    },
    separator: {
        borderTop: '1px solid #DFE0EB',
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    },
    hide: {
        left: -255
    },
    show: {
        left: 0
    }
});

/*
Class SidebarComponent
*/
class SidebarComponent extends React.Component {
    /*
    Class Variable
    */
    state = { expanded: false };

    /*
    Function: onItemClicked
    Arguments: None
    Purpose: When sidebar attribute clicked, update neccessary variables. 
    */
    onItemClicked = (item) => {
        this.setState({ expanded: false });
        return this.props.onChange(item);
    }

    /*
    Function: isMobile
    Arguments: None
    Purpose: Set width of sidebar. 
    */
    isMobile = () => window.innerWidth <= 768;

    /*
    Function: toggleMenu
    Arguments: None
    Purpose: Handle sidebar menu toggling. 
    */
    toggleMenu = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

    /*
    Function: renderBurger
    Arguments: None
    Purpose: Return IconBurger component. 
    */
    renderBurger = () => {
        return <div onClick={this.toggleMenu} className={css(styles.burgerIcon)}>
            <IconBurger />
        </div>
    }

    /*
    Function: changePageToHome
    Arguments: None
    Purpose: Changing to home page when clicked on sidebar. 
    */
    changePageToHome = (props) => {
        window.location.href = 'http://localhost:3000/';
    }

    /*
    Function: changePageToSchedule
    Arguments: None
    Purpose: Changing to nurses schedule page when clicked on sidebar. 
    */
    changePageToSchedule = (props) => {
        window.location.href = 'http://localhost:3000/NurseViewSchedule';
    }

    /*
    Function: changePageToPatientsAndTasks
    Arguments: None
    Purpose: Changing to nurses patients and tasks page when clicked on sidebar. 
    */
    changePageToPatientsAndTasks = (props) => {
        window.location.href = 'http://localhost:3000/NurseViewPatients';
    }

    /*
    Function: changePageToLoginPage
    Arguments: None
    Purpose: Changing to login page when clicked on sidebar. 
    */
    changePageToLoginPage = (props) => {
        var response = window.confirm(`Are you sure you want to logout?`);
        if (response == true) {
            window.location.href = 'http://localhost:3000/LoginPage';
        }
    }

    /*
    Render webpage
    */
    render() {
        const { expanded } = this.state;
        const isMobile = this.isMobile();
        return (
            <div style={{ position: 'relative' }}>
                <Row className={css(styles.mainContainer)} breakpoints={{ 768: css(styles.mainContainerMobile) }}>
                    {(isMobile && !expanded) && this.renderBurger()}
                    <Column className={css(styles.container)} breakpoints={{ 768: css(styles.containerMobile, expanded ? styles.show : styles.hide) }}>
                        <LogoComponent
                            title="Home"
                            imgName={IconHome}
                            onClick={() => this.changePageToHome()}
                            active={this.selectedItem === 'Home'}
                        />
                        <Column className={css(styles.menuItemList)}>
                            <MenuItemComponent
                                title="My Schedule" imgName={IconSchedule}
                                onClick={() => this.changePageToSchedule()}
                                active={this.props.selectedItem === 'My Schedule'}
                            />
                            <MenuItemComponent
                                title="My Tasks" imgName={IconAppointments}
                                onClick={() => this.changePageToPatientsAndTasks()}
                                active={this.props.selectedItem === 'My Tasks'}
                            />
                            <div className={css(styles.separator)}></div>
                            <MenuItemComponent
                                title="Logout" imgName={IconLogout}
                                onClick={() => this.changePageToLoginPage()}
                                active={this.props.selectedItem === 'Logout'} />
                        </Column>
                    </Column>
                    {isMobile && expanded && <div className={css(styles.outsideLayer)} onClick={this.toggleMenu}></div>}
                </Row>
            </div>
        );
    };
}

/*
Exporting component so other files can use component.
*/
export { SidebarComponent };