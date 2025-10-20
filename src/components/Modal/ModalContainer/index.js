import classNames from 'classnames/bind';

import styles from '../Modal.module.scss';

const cx = classNames.bind(styles);
function ModalContainer({ className, small = false, medium = false, children, ...passProps }) {
    const classes = cx({
        modalBasic_Small: small,
        modalBasic_Medium: medium,
    });
    const props = {
        ...passProps,
    };
    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}

export default ModalContainer;
