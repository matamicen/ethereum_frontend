// Inteface of Button component
export interface ButtonSettings {

    label: string;                      // Label of button
    onClick?: () => void;                // Function to be executed on click
    title?: string;                     // Title of button
    variant?: 'default' | 'primary';    // Variant of button

}
