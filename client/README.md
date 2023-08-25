# Accessible Payment Gateway for Visually Challenged

This project aims to develop an accessible payment gateway specifically designed for individuals with visual impairments. The goal is to provide an inclusive and user-friendly platform that enables visually challenged users to make online payments easily and independently. This README file serves as a guide to understand the project, its features and setup.

## Features

1. **Screen Reader Compatibility**: The payment gateway is designed to be compatible with popular screen reader software, ensuring that visually impaired users can navigate and interact with the application effortlessly.

2. **Accessible User Interface**: The user interface follows accessibility guidelines and incorporates features such as high contrast, large fonts, and clear navigation to improve usability for visually challenged individuals.

3. **Alternative Text and ARIA Labels**: All visual elements, including buttons, icons, and images, are accompanied by descriptive alternative text or ARIA labels. This ensures that screen readers can accurately convey the meaning and purpose of each element.

4. **Keyboard Navigation**: The application supports keyboard navigation, allowing users to navigate through the payment process without relying on a mouse. Keyboard shortcuts and focus indicators are implemented to provide a smooth and intuitive experience.

5. **Voice Confirmation**: The application provides voice confirmation for successful transactions, ensuring that visually impaired users receive audio feedback to verify the completion of their payments.

6. **Enhanced Error Handling**: Error messages are presented in a clear and concise manner, with appropriate auditory cues and feedback to help visually challenged users identify and resolve any issues that may arise during the payment process.

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

- Node.js (version 12.0 or above)
- npm (Node Package Manager) or yarn (preferred)

To set up the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/DevOpsTally/2023-05-29-VA-1.git
   ```

2. Install dependencies:

   ```
   cd 2023-05-29-VA-1
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Access the application in your browser:

   ```
   http://localhost:5173/
   ```

## Technology Stack

The project utilizes the following technologies:

- Vite: A fast and lightweight build tool for modern web applications.
- React Js: A progressive JavaScript framework for building user interfaces.
- HTML5: The latest version of the HTML standard, ensuring semantic and accessible markup.
- CSS3: The latest version of the CSS standard, providing flexibility in styling and layout.
- JavaScript: The programming language used to add interactivity and dynamic behavior to the application.

## Testing Accessibility using NVDA or JAWS Screen Reader

## Prerequisites

Before testing the accessibility of the payment gateway, make sure you have the following:

- A computer or device with NVDA or JAWS screen reader software installed.
- Familiarity with the basic functionalities of the screen reader software.

## Testing Steps

1. **Enable Screen Reader**: Launch the NVDA or JAWS screen reader software on your computer.

2. **Navigate to Web Application**: Open a web browser and navigate to VA Pay payment gateway.

3. **Turn on Screen Reader Support**: Ensure that the screen reader software is actively reading content from the web page. You should hear the screen reader speaking the page title or other relevant information.

4. **Keyboard Navigation**: Test the application's keyboard accessibility by using only the keyboard to navigate through the application. Pay attention to the focus order, focus indicators, and logical navigation flow. Ensure that you can reach all interactive elements (links, buttons, form fields) using the keyboard alone.

5. **Screen Reader Compatibility**: Verify that the screen reader accurately reads out the content and provides meaningful information. The screen reader should announce elements such as headings, links, buttons, form fields, and error messages correctly.

6. **Alternative Text for Images**: Test whether the screen reader announces alternative text for images correctly. Ensure that the alternative text provides descriptive information about the image.

7. **Form Accessibility**: Test the accessibility of forms by filling them out using the keyboard. Ensure that form fields are announced correctly, and any associated error messages are read out by the screen reader.

8. **Focus Management**: Test the focus management when interacting with different components. Verify that the screen reader follows the focus as expected and announces the focused element.

9. **Semantic HTML and ARIA**: Verify that the screen reader properly interprets the semantic HTML elements and ARIA attributes used in your web application. Check that they enhance the accessibility and provide accurate information to the screen reader users.

10. **Test on Different Browsers**: Repeat the testing steps on multiple web browsers to ensure consistent accessibility across various browser platforms.

## Resources

- [NVDA Screen Reader](https://www.nvaccess.org/)
- [JAWS Screen Reader](https://www.freedomscientific.com/products/software/jaws/)
- [ARIA Attributes Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)