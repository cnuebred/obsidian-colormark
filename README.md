# Color Mark Extension for Obsidian.md

## Overview

This extension for Obsidian.md enhances the text editing experience by providing dynamic syntax highlighting within the editor. It allows users to mark text with custom colors and background colors by using a simple syntax. This README will guide you through the installation process, usage, and how to contribute or report issues.

## Prerequisites

Before installing the Color Mark Extension, make sure you have Obsidian.md version X.X or higher. No other dependencies are required.

## Installation

### Step-by-Step Guide

To install the Color Mark Extension in Obsidian, follow these instructions carefully:

1. **Download the Extension from GitHub:**
    - Navigate to the [Color Mark Extension GitHub repository](https://github.com/cnuebred/obsidian-colormark).
    - You can clone the repository using Git or download it as a ZIP file by clicking the "Code" button and selecting "Download ZIP".

2. **Add the Extension to Obsidian:**
    - Locate your Obsidian vault in your file system.
    - In your vault, navigate to the `.obsidian/plugins` directory. If the plugins directory does not exist, create it.
    - Extract the downloaded extension folder into the plugins directory.

3. **Enable the Extension in Obsidian:**
    - Open Obsidian and go to `Settings` > `Community Plugins`.
    - Make sure Safe Mode is turned off.
    - Navigate to `Installed Plugins`. You should see the Color Mark Extension listed there.
    - Click on the toggle next to the extension name to enable it.

Please note: Since this extension is not available through the Obsidian Community Plugins, it must be manually added to your Obsidian. Ensure you trust the source of this plugin, as plugins can execute arbitrary code within your Obsidian environment.

## Usage

This extension introduces a simple syntax to add color or background color to your text:

- `{#hexColor|text}` to apply text color.
- `{$hexColor|text}` to apply background color.
- `{#hexTextColor$hexBgColor|text}` to apply both text and background color.

### Examples

- `{#f00|This text is red}`
- `{$0f0|This background is green}`
- `{#00f$f00|This text is blue with a red background}`

## Features

- **Dynamic Coloring:** Easily highlight texts within your notes using hex color codes.
- **Customizable:** Mix and match text and background colors as needed.
- **Performance Optimized:** Designed to work efficiently without impacting the performance of Obsidian.md.
- **Accessibility Considerations:** Color schemes are customizable to accommodate different readability needs.

## Contributing

Contributions to improve the Color Mark Extension are welcome. Here's how you can contribute:

- **Reporting Bugs:** Encounter a bug? Open an issue on the [GitHub issue tracker](https://github.com/cnuebred/obsidian-colormark/issues).
- **Feature Requests:** Have an idea to make this extension better? Submit your suggestions as an issue.
- **Code Contributions:** Fork the repository, make your changes, and submit a pull request. Please ensure your code adheres to the project's coding standards.
- **Documentation, Tutorials, and Translations:** Help us make the extension more accessible by contributing to documentation, creating tutorials, or providing translations.


## License

This project is licensed under the MIT License - see the LICENSE file in the GitHub repository for details.

For more information, updates, or to contribute, please visit the [GitHub repository](https://github.com/cnuebred/obsidian-colormark).

