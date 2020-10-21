import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast'

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
// import { opacify } from 'polished';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWidthTransitions = useTransition(
        messages, 
        message => message.id,
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 }
        }    
    );

    return (
        <Container>
            {messagesWidthTransitions.map(({ item, key, props }) => (
                    <Toast 
                        key={key}
                        message={item}
                        style={props}
                    />
            ))}
        </Container>
    )
}

export default ToastContainer;