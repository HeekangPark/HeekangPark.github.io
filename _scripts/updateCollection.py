import os
import copy
import yaml
import shutil
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
others_config_file = "_config/others.yml"
config_file = "_config.yml"

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

class ChoicePromptControl():
    class ChoiceControl(FormattedTextControl):
        def __init__(self, choices, start_index):
            self.choices = choices
            while start_index < 0:
                start_index += len(self.choices)
            self.index = start_index
            self.selected = False
            super().__init__(self._get_choice_tokens)

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
            return {
                "index": self.index,
                "value": self.choices[self.index]
            }
        
        def moveCursorUp(self):
            self.index = (self.index + len(self.choices) - 1) % len(self.choices)
        
        def moveCursorDown(self):
            self.index = (self.index + 1) % len(self.choices)

    class ManualInputValidator(Validator):
        def validate(self, document) -> None:
            manual_input = document.text
            if len(manual_input) == 0:
                raise ValidationError(message="Manual input cannot be an empty string.")

    def __init__(self, prompt, choices, start_index=0, is_last_choice_manual_input=False):
        if prompt[-1] != " ":
            prompt = prompt + " "
        self.prompt = prompt
        self.choices_len = len(choices)
        self.is_last_choice_manual_input = is_last_choice_manual_input
        self.choice_control = self.ChoiceControl(choices=choices, start_index=start_index)
    
    def _get_prompt_tokens(self):
        tokens = []

        tokens.append(("class:question", self.prompt))
        if self.choice_control.selected:
            tokens.append(("", self.choice_control.getSelectedOption()))
        else:
            tokens.append(("class:warning", "(Use arrow keys)"))

        return tokens

    def run(self):
        layout = ConditionalContainer(HSplit([
            Window(height=LayoutDimension.exact(1), content=FormattedTextControl(self._get_prompt_tokens)),
            Window(self.choice_control)
        ]), filter=~IsDone())
        key_bindings = KeyBindings()

        @key_bindings.add("up", eager=True)
        def moveCursorUp(event):
            self.choice_control.moveCursorUp()
        
        @key_bindings.add("down", eager=True)
        def moveCursorDown(event):
            self.choice_control.moveCursorDown()
        
        @key_bindings.add("c-c", eager=True)
        def _(event):
            event.app.exit(result="KeyboardInterrupt")

        @key_bindings.add("enter", eager=True)
        def setAnswer(event):
            self.choice_control.selected = True
            event.app.exit(result=self.choice_control.getSelectedOption())

        result = Application(
            layout=Layout(layout),
            key_bindings=key_bindings,
            style=style
        ).run()

        if result == "KeyboardInterrupt":
            raise KeyboardInterrupt()

        if self.is_last_choice_manual_input == True and result["index"] == self.choices_len - 1:
            result = {
                "index": None,
                "value": prompt([
                    ("class:question", self.prompt)
                ], style=style, validator=self.ManualInputValidator())
            }
        else:
            print_formatted_text(FormattedText([
                ("class:question", self.prompt),
                ("", result['value']),
            ]), style=style)

        return result

class ConfirmValidator(Validator):
    def validate(self, document) -> None:
        result = document.text
        if result.lower() not in ["y", "n", ""]:
            raise ValidationError(message="Invalid input! Only \"\\n\"(yes), \"y\"(yes), \"n\"(no) are available.")

def readConfig():
    with open(collections_config_file, "r", encoding="UTF-8") as f:
        collections = yaml.load(f, Loader=yaml.FullLoader)
    
    with open(others_config_file, "r", encoding="UTF-8") as f:
        config = yaml.load(f, Loader=yaml.FullLoader)

    return collections, config

def writeConfig(collections, config):
    # merge config and collections
    if "collections" in config.keys():
        config["collections"].update(collections)
    else:
        config["collections"] = collections

    # add defaults
    if "defaults" not in config.keys():
        config["defaults"] = []
    
    skip_defaults_labels = [item["scope"]["type"] for item in config["defaults"] if "scope" in item.keys() and "type" in item["scope"].keys()]
        
    config["defaults"].extend([{
        "scope": {
            "path": "",
            "type": label
        },
        "values": {
            "layout": "document"
        }
    } for label in collections.keys() if label not in skip_defaults_labels])
    config["defaults"].sort(key=lambda x:x["scope"]["type"])

    # write on _config/collections.yml
    with open(collections_config_file, "w", encoding="UTF-8") as f:
        yaml.dump(collections, f, allow_unicode=True)

    # write on _config.yml
    with open(config_file, "w", encoding="UTF-8") as f:
        yaml.dump(config, f, allow_unicode=True, sort_keys=False)

def getUserInput_label(collections, config, label_hint=None):
    class LabelValidator(Validator):
        def validate(self, document) -> None:
            label = document.text
            if len(label) == 0:
                raise ValidationError(message="Label cannot be an empty string.")
            elif label in config["collections"].keys():
                raise ValidationError(message="Label already exists. Try another label.")
            elif label in collections.keys():
                if label_hint is None:
                    raise ValidationError(message="Label already exists. Try another label.")
                else:
                    if label != label_hint:
                        raise ValidationError(message="Label already exists. Try another label.")
    
    if label_hint is None:
        return prompt([
            ("class:question", "Collection label? ")
        ], style=style, validator=LabelValidator())
    else:
        return prompt([
            ("class:question", "Collection label? ")
        ], style=style, default=label_hint, validator=LabelValidator())

def getUserInput_name(collections, config, name_hint=None):
    class NameValidator(Validator):
        def validate(self, document) -> None:
            name = document.text
            if len(name) == 0:
                raise ValidationError(message="Name cannot be an empty string.")

    if name_hint is None:
        return prompt([
            ("class:question", "Collection name? ")
        ], style=style, validator=NameValidator())
    else:
        return prompt([
            ("class:question", "Collection name? ")
        ], style=style, default=name_hint, validator=NameValidator())

def getUserInput_category(collections, config, category_hint=None):
    categories = list(set([collection["category"] for collection in collections.values() if "category" in collection.keys()]))
    categories.append("직접 입력...")

    if category_hint is None:
        start_index = -1
    else:
        try:
            start_index = categories.index(category_hint)
        except:
            start_index = -1

    category = ChoicePromptControl(prompt="Collection category?", choices=categories, start_index=start_index, is_last_choice_manual_input=True).run()

    return category["value"]

def getUserInput_tags(collections, config, tags_hint=None):
    if tags_hint is None:
        raw_input = prompt([
            ("class:question", "Category tags? ")
        ], style=style)
    else:
        raw_input = prompt([
            ("class:question", "Category tags? ")
        ], style=style, default=",".join(tags_hint))

    return sorted(list(filter(lambda x: len(x) != 0, set([x.strip() for x in raw_input.split(",")]))))

def addCollection(collections, config):
    new_collection_label = getUserInput_label(collections=collections, config=config)
    new_collection_name = getUserInput_name(collections=collections, config=config, name_hint=new_collection_label)
    new_collection_category = getUserInput_category(collections=collections, config=config)
    new_collection_tags = getUserInput_tags(collections=collections, config=config)

    confirm_result = prompt([
        ("class:question", "====================\n"),
        ("class:question", "Collection\n"),
        ("", f"  label:    {new_collection_label}\n"),
        ("", f"  name:     {new_collection_name}\n"),
        ("", f"  category: {new_collection_category}\n"),
        ("", f"  tags:     {new_collection_tags}\n"),
        ("class:question", "will be added. Continue? (Y/n) ")
    ], style=style, validator=ConfirmValidator())

    if confirm_result.lower() in ["y", ""]:
        collections[new_collection_label] = {
            "output": True,
            "permalink": "/:collection/:name",
            "name": new_collection_name,
            "category": new_collection_category,
            "tags": new_collection_tags
        }

        # create directory
        directory = f"documents/_{new_collection_label}"
        if not os.path.exists(directory):
            os.makedirs(directory)
    
    return collections, config

def modifyCollection(collections, config):
    collection_labels = list(collections.keys())
    selected = ChoicePromptControl(prompt="Collection to modify? (name [label])", choices=[f"{collections[label]['name']} [{label}]" for label in collection_labels]).run()
    
    old_collection_label = collection_labels[selected["index"]]
    old_collection = collections[old_collection_label]
    old_collection_name = old_collection["name"]
    old_collection_category = old_collection["category"]
    old_collection_tags = old_collection["tags"]

    new_collection_label = getUserInput_label(collections=collections, config=config, label_hint=old_collection_label)
    new_collection_name = getUserInput_name(collections=collections, config=config, name_hint=old_collection_name)
    new_collection_category = getUserInput_category(collections=collections, config=config, category_hint=old_collection_category)
    new_collection_tags = getUserInput_tags(collections=collections, config=config, tags_hint=old_collection_tags)

    confirm_result = prompt([
        ("class:question", "====================\n"),
        ("class:question", "Collection\n"),
        ("", f"  label:    {old_collection_label}\n"),
        ("", f"  name:     {old_collection_name}\n"),
        ("", f"  category: {old_collection_category}\n"),
        ("", f"  tags:     {old_collection_tags}\n"),
        ("class:question", "will be modified to\n"),
        ("", f"  label:    {new_collection_label}\n"),
        ("", f"  name:     {new_collection_name}\n"),
        ("", f"  category: {new_collection_category}\n"),
        ("", f"  tags:     {new_collection_tags}\n"),
        ("class:question", "Continue? (Y/n) ")
    ], style=style, validator=ConfirmValidator())

    if confirm_result.lower() in ["y", ""]:
        # delete old collection
        del collections[old_collection_label]

        # add new data
        collections[new_collection_label] = {
            "output": True,
            "permalink": "/:collection/:name",
            "name": new_collection_name,
            "category": new_collection_category,
            "tags": new_collection_tags
        }

        # rename directory : documents/{collection}/
        old_directory = f"documents/_{old_collection_label}"
        new_directory = f"documents/_{new_collection_label}"
        if os.path.exists(old_directory):
            os.rename(old_directory, new_directory)
        
        # rename directory : assets/img/{collection}/
        old_directory = f"assets/img/{old_collection_label}"
        new_directory = f"assets/img/{new_collection_label}"
        if os.path.exists(old_directory):
            os.rename(old_directory, new_directory)

        # rename file : assets/collections/{collection}.js
        old_file = f"assets/collections/{old_collection_label}.js"
        new_file = f"assets/collections/{new_collection_label}.js"
        if os.path.exists(old_file):
            os.rename(old_file, new_file)

        # rename file : assets/collections/{collection}.scss
        old_file = f"assets/collections/{old_collection_label}.scss"
        new_file = f"assets/collections/{new_collection_label}.scss"
        if os.path.exists(old_file):
            os.rename(old_file, new_file)

    return collections, config

def deleteCollection(collections, config):
    def deleteDirectoryWithConfirmation(directory):
        if os.path.exists(directory):
            if len(os.listdir(directory)) == 0: # if directory is empty, delete without confirmation
                os.rmdir(directory)
            else:
                confirm_result = prompt([
                    ("class:question", f"Delete directory {directory}? Directory is not empty. (y/N) ")
                ], style=style, validator=ConfirmValidator())

                if confirm_result.lower() == "y":
                    shutil.rmtree(directory)

    collection_labels = list(collections.keys())
    selected = ChoicePromptControl(prompt="Collection to delete? (name [label])", choices=[f"{collections[label]['name']} [{label}]" for label in collection_labels]).run()
    
    old_collection_label = collection_labels[selected["index"]]
    old_collection = collections[old_collection_label]
    old_collection_name = old_collection["name"]
    old_collection_category = old_collection["category"]
    old_collection_tags = old_collection["tags"]

    confirm_result = prompt([
        ("class:question", "====================\n"),
        ("class:question", "Collection\n"),
        ("", f"  label:    {old_collection_label}\n"),
        ("", f"  name:     {old_collection_name}\n"),
        ("", f"  category: {old_collection_category}\n"),
        ("", f"  tags:     {old_collection_tags}\n"),
        ("class:question", "will be deleted. Continue? (Y/n) ")
    ], style=style, validator=ConfirmValidator())

    if confirm_result.lower() in ["y", ""]:
        del collections[old_collection_label]

        deleteDirectoryWithConfirmation(f"documents/_{old_collection_label}")
        deleteDirectoryWithConfirmation(f"assets/img/{old_collection_label}")
        deleteDirectoryWithConfirmation(f"assets/etc/{old_collection_label}")

    return collections, config

if __name__ == "__main__":
    collections, config = readConfig()
    old_collections = copy.deepcopy(collections)

    try:
        menu = ChoicePromptControl(prompt="What to do?", choices=["Collection 추가하기", "Collection 변경하기", "Collection 삭제하기", "종료"]).run()

        if menu["index"] == 0:
            collections, config = addCollection(collections=collections, config=config)
        elif menu["index"] == 1:
            collections, config = modifyCollection(collections=collections, config=config)
        elif menu["index"] == 2:
            collections, config = deleteCollection(collections=collections, config=config)

        writeConfig(collections=collections, config=config)
    except KeyboardInterrupt:
        print_formatted_text(FormattedText([
            ("class:error", "Script aborted.")
        ]), style=style)
    except Exception as e:
        print_formatted_text(FormattedText([
            ("class:error", e)
        ]), style=style)

    # checks if collections is changed
    if collections == old_collections:
        print_formatted_text(FormattedText([
            ("class:warning", f"UpdateCollection : Nothing has been modified")
        ]), style=style)
    else:
        print_formatted_text(FormattedText([
            ("class:success", f"UpdateCollection : {collections_config_file} successfully modified.\n"),
            ("class:success", f"                 : {config_file} successfully modified.")
        ]), style=style)
