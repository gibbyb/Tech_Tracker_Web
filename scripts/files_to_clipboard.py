#!/usr/bin/env python3

import os
import sys
import argparse
from pathlib import Path
import pyperclip
import questionary

# List of directories to exclude
EXCLUDED_DIRS = {'node_modules', '.next', '.venv', '.git', '__pycache__', '.idea', '.vscode', 'ui'}

def collect_files(project_path):
    """
    Collects files from the project directory, excluding specified directories and filtering by extensions.
    Returns a list of file paths relative to the project directory.
    """
    collected_files = []

    for root, dirs, files in os.walk(project_path):
        # Exclude specified directories
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]

        for file in files:
            file_path = Path(root) / file
            relative_path = file_path.relative_to(project_path)
            collected_files.append(relative_path)

    return collected_files

def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description='Generate Markdown from selected files.')
    parser.add_argument('path', nargs='?', default='.', help='Path to the project directory')
    args = parser.parse_args()

    project_path = Path(args.path).resolve()
    if not project_path.is_dir():
        print(f"Error: '{project_path}' is not a directory.")
        sys.exit(1)

    # Collect files from the project directory
    file_list = collect_files(project_path)

    if not file_list:
        print("No files found in the project directory with the specified extensions.")
        sys.exit(1)

    # Sort file_list for better organization
    file_list.sort()

    # Interactive file selection using questionary
    print("\nSelect the files you want to include:")
    selected_files = questionary.checkbox(
        "Press space to select files, and Enter when you're done:",
        choices=[str(f) for f in file_list]
    ).ask()

    if not selected_files:
        print("No files selected.")
        sys.exit(1)

    # Generate markdown
    markdown_lines = []
    markdown_lines.append('')

    for selected_file in selected_files:
        file_path = project_path / selected_file
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            # Determine the language for code block from file extension
            language = file_path.suffix.lstrip('.')
            markdown_lines.append(f'{selected_file}')
            markdown_lines.append(f'```{language}')
            markdown_lines.append(content)
            markdown_lines.append('```')
            markdown_lines.append('')
        except Exception as e:
            print(f"Error reading file {selected_file}: {e}")

    markdown_text = '\n'.join(markdown_lines)

    # Write markdown to file
    output_file = 'output.md'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(markdown_text)
    print(f"\nMarkdown file '{output_file}' has been generated.")

    # Copy markdown content to clipboard
    pyperclip.copy(markdown_text)
    print("Markdown content has been copied to the clipboard.")

if __name__ == "__main__":
    # Check if required libraries are installed
    try:
        import questionary
        import pyperclip
    except ImportError as e:
        missing_module = e.name
        print(f"Error: Missing required module '{missing_module}'.")
        print(f"Please install it by running: pip install {missing_module}")
        sys.exit(1)

    main()
