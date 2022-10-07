// Models
import { ButtonConstants } from "./button.constants";
import { ButtonSettings } from "./button.models";

// Styles
// import './button.styles.scss';

/**
 * Button component
 * @description This is the button to make semantic buttons
 * @param {ButtonSettings} settings
 * @returns {JSX.Element}
 */
export default function ButtonComponent(settings: ButtonSettings): JSX.Element {

    // Dinamically ClassNames
    const classNames: string[] = [

        // Default ClassName
        ButtonConstants.CLASSNAME,

        // Variant ClassName
        ...settings.variant ? [settings.variant] : [],

    ];

    return <button
        className={classNames.join(' ')}
        title={settings.title}
        onClick={settings.onClick}
        // eslint-disable-next-line react/no-children-prop
        children={settings.label}
    />

}
