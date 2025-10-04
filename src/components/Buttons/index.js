import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.moudule.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    second = false,
    third = false,
    four = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    vlarge = false,
    children,
    className,
    icon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        second,
        third,
        four,
        text,
        disabled,
        small,
        large,
        vlarge,
    });
    return (
        <Comp className={classes} {...props}>
            {icon && <span className={cx('icon')}>{icon}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
