import os
import sys
import yaml
from prompt_toolkit import prompt, Application, print_formatted_text
from prompt_toolkit.formatted_text import FormattedText
from prompt_toolkit.styles import Style
from prompt_toolkit.key_binding import KeyBindings
from prompt_toolkit.validation import ValidationError, Validator
from prompt_toolkit.filters import IsDone
from prompt_toolkit.layout.controls import FormattedTextControl
from prompt_toolkit.layout.layout import Layout
from prompt_toolkit.layout.containers import HSplit, ConditionalContainer, Window
from prompt_toolkit.layout.dimension import LayoutDimension

collections_config_file = "_config/collections.yml"

style = Style.from_dict({
    '': "#ff9d00",
    "question": "fg:ansicyan",
    "cursor": "fg:ansicyan",
    "unselected_option": "fg:ansiwhite",
    "selected_option": "#ff9d00 bold",
    "success": "fg:ansigreen",
    "warning": "fg:ansiyellow",
    "error": "fg:ansired"
})

def readConfig():
    with open(collections_config_file, "r", encoding="UTF-8") as f:
        config = yaml.load(f, Loader=yaml.FullLoader)
    return config

def readCollectionInfo(config):
    def readLabel():
        class LabelValidator(Validator):
            def validate(self, document) -> None:
                label = document.text
                if len(label) == 0:
                    raise ValidationError(message="Label cannot be an empty string.")
                elif label in config["collections"].keys():
                    raise ValidationError(message="Label already exists. Try another label.")

        return prompt([
            ("class:question", "Collection label? ")
        ], style=style, validator=LabelValidator())

    def readName(label):
        return prompt([
            ("class:question", f"Collection name? ")
        ], style=style, default=label)
    
    def readCategory():
        question = "Collection category? "
        manualInputPrompt = "직접 입력..."

        class CategoryContol(FormattedTextControl):
            def __init__(self, **kwargs):
                self.choices = list(set([collection["category"] for collection in config["collections"].values() if "category" in collection.keys()]))
                self.choices.append((manualInputPrompt))
                self.index = len(self.choices) - 1
                self.selected = False
                super().__init__(self._get_choice_tokens, **kwargs)

            def _get_choice_tokens(self):
                tokens = []

                for i, choice in enumerate(self.choices):
                    if i != 0:
                        tokens.append(("", "\n"))

                    if i == self.index:
                        tokens.append(("class:cursor", "> "))
                        tokens.append(("class:selected_option", choice))
                    else:
                        tokens.append(("class:cursor", "  "))
                        tokens.append(("class:unselected_option", choice))
                
                return tokens

            def getSelectedOption(self):
                return self.choices[self.index]
            
            def moveCursorUp(self):
                self.index = (self.index + len(self.choices) - 1) % len(self.choices)
            
            def moveCursorDown(self):
                self.index = (self.index + 1) % len(self.choices)

            def isManualInput(self):
                if self.selected and self.index == len(self.choices) - 1:
                    return True
                else:
                    return False

        categoryControl = CategoryContol()

        def get_prompt_tokens():
            tokens = []

            tokens.append(("class:question", question))
            if categoryControl.selected:
                tokens.append(("", categoryControl.getSelectedOption()))
            else:
                tokens.append(("class:warning", "(Use arrow keys)"))

            return tokens

        layout = ConditionalContainer(HSplit([
            Window(height=LayoutDimension.exact(1), content=FormattedTextControl(get_prompt_tokens)),
            Window(categoryControl)
        ]), filter=~IsDone())
        key_bindings = KeyBindings()

        @key_bindings.add("up", eager=True)
        def moveCursorUp(event):
            categoryControl.moveCursorUp()
        
        @key_bindings.add("down", eager=True)
        def moveCursorDown(event):
            categoryControl.moveCursorDown()
        
        @key_bindings.add("c-c", eager=True)
        def _(event):
            raise KeyboardInterrupt()

        @key_bindings.add("enter", eager=True)
        def setAnswer(event):
            categoryControl.selected = True
            event.app.exit(result=categoryControl.getSelectedOption())
        
        category = Application(
            layout=Layout(layout),
            key_bindings=key_bindings,
            style=style
        ).run()

        if category == manualInputPrompt:
            category = prompt([
                ("class:question", question)
            ], style=style)
        else:
            print_formatted_text(FormattedText([
                ("class:question", question),
                ("", category),
            ]), style=style)

        return category
    
    def readTags():
        raw_input = prompt([
            ("class:question", "Category tags? ")
        ], style=style)

        return sorted(list(set([x.strip() for x in raw_input.split(",")])))

    label = readLabel()
    name = readName(label)
    category = readCategory()
    tags = readTags()

    return {
        "label": label,
        "name": name,
        "category": category,
        "tags": tags
    }

def writeConfig(config, collection_info):
    config["collections"][collection_info["label"]] = {
        "output": True,
        "permalink": "/:collection/:name",
        "name": collection_info["name"],
        "category": collection_info["category"],
        "tags": collection_info["tags"]
    }

    config["defaults"].append({
        "scope": {
            "path": "",
            "type": collection_info["label"]
        },
        "values": {
            "layout": "document"
        }
    })

    directory = f"documents/_{collection_info['label']}"
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(collections_config_file, "w", encoding="UTF-8") as f:
        yaml.dump(config, f, allow_unicode=True)

if __name__ == "__main__":
    config = readConfig()

    try:
        collection_info = readCollectionInfo(config)
    except KeyboardInterrupt:
        print_formatted_text(FormattedText([
            ("class:error", "Script aborted.")
        ]), style=style)
        sys.exit(1)
    
    try:
        writeConfig(config, collection_info)
        print_formatted_text(FormattedText([
            ("class:success", f"{collections_config_file} successfully updated.")
        ]), style=style)
    except Exception as e:
        print_formatted_text(FormattedText([
            ("class:error", e)
        ]), style=style)
        sys.exit(1)