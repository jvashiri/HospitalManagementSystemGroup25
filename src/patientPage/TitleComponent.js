/*
Importing all necessary components required
*/
import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';

/*
Styling the webpage attributes.
*/
const styles = StyleSheet.create({
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: '1px solid #DFE0EB',
    },
    container: {
        height: 40
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    name: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        textAlign: 'right',
        letterSpacing: 0.2,
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 12,
            marginRight: 12
        }
    },
    title: {
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3,
        '@media (max-width: 768px)': {
            marginLeft: 36
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
});

/*
Function TitleComponent
*/
function TitleComponent(props) {
    const { icon, title, ...otherProps } = props;

    /*
    Return Title Component
    */
    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>
            <span className={css(styles.title)}>{title}</span>

        </Row>
    );
}

/*
Sets the propType of Title component
*/
TitleComponent.propTypes = {
    title: string
};

/*
Exporting component so other files can use component.
*/
export { TitleComponent };