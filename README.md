# SaveMyLink - A Chrome Extension to Save Links

SaveMyLink is a lightweight React-TypeScript Chrome extension that helps you save and organize important links from your browser. With an intuitive interface and simple functionality, you can revisit your saved links anytime with ease.

## Features

- **Save URLs Manually:** Add any URL using the input field and save it to your list.
- **Save Current Tab's URL:** Quickly capture the URL of the active browser tab.
- **Persistent Storage:** Saved links remain intact even after you close the extension.
- **Responsive Design:** A user-friendly interface styled with TailwindCSS for both desktop and mobile views.
- **Validation:** Ensures only valid URLs are saved.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Ensures type safety and reliability.
- **TailwindCSS**: Provides utility-first CSS for responsive design.
- **Chrome API**: Used to fetch and save the active tab's URL.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/SaveMyLink.git
   ```

2. Navigate to the project directory:
   ```bash
   cd SaveMyLink
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Load the extension in Chrome:
   - Open `chrome://extensions/` in your browser.
   - Enable **Developer mode**.
   - Click on **Load unpacked** and select the `build` folder in the project directory.

## Usage

1. Open the extension by clicking the SaveMyLink icon in your browser toolbar.
2. To manually save a link:
   - Enter the URL in the input field.
   - Click on "Save URL."
3. To save the current tab's URL:
   - Click on the "Save From Tab" button.
4. View your saved links in the "Saved Links" section. Click on any link to open it in a new tab.

## File Structure

```
SaveMyLink/
├── public/
│   ├── manifest.json  # Chrome extension manifest file
│   ├── index.html     # HTML template
│   └── assets/        # Static assets (images, icons, etc.)
├── src/
│   ├── components/
│   │   └── LinkBox.tsx  # Component to render individual saved links
│   ├── App.tsx          # Main application component
│   ├── index.tsx        # Entry point for React
│   ├── styles/
│   │   └── tailwind.css # TailwindCSS styles
│   └── utils/
│       └── validators.ts # Helper function for URL validation
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Configuration

### Chrome Permissions
Ensure the `manifest.json` file contains the following permissions:

```json
{
  "permissions": ["tabs", "activeTab"],
  "host_permissions": ["<all_urls>"]
}
```

### TypeScript Setup
Install the Chrome type definitions:
```bash
npm install @types/chrome --save-dev
```
Update `tsconfig.json` to include:
```json
{
  "compilerOptions": {
    "types": ["chrome"]
  }
}
```

## Troubleshooting

- **Cannot find name 'chrome':** Ensure you have installed the `@types/chrome` package and updated your `tsconfig.json`.
- **Extension not loading:** Double-check the manifest file and ensure it's placed in the `public` folder.
- **Invalid URLs:** Use the built-in validation to ensure URLs are correctly formatted before saving.

## Contribution

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, feel free to contact:
- Email: yorubamerlin@example.com
- GitHub: [yorubamerlin](https://github.com/yorubamerlin)

# SaveMyLink
