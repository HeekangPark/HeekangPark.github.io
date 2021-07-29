import yaml
from prompt_toolkit import print_formatted_text
from prompt_toolkit.formatted_text import FormattedText
from prompt_toolkit.styles import Style

collections_config_file = "_config/collections.yml"
others_config_file = "_config/others.yml"
config_file = "_config.yml"

style = Style.from_dict({
    "success": "fg:ansigreen",
    "warning": "fg:ansiyellow",
    "a": "fg:ansibrightcyan",
    "m": "#ff9d00",
    "d": "fg:ansibrightmagenta"
})

# read configs
with open(collections_config_file, "r", encoding="UTF-8") as f:
    collections = yaml.load(f, Loader=yaml.FullLoader)

with open(others_config_file, "r", encoding="UTF-8") as f:
    config = yaml.load(f, Loader=yaml.FullLoader)

with open(config_file, "r", encoding="UTF-8") as f:
    old_config = yaml.load(f, Loader=yaml.FullLoader)

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

# write on _config.yml
with open(config_file, "w", encoding="UTF-8") as f:
    yaml.dump(config, f, allow_unicode=True, sort_keys=False)

# checks if config is changed
if config == old_config:
    print_formatted_text(FormattedText([
        ("class:warning", f"MergeConfig : Nothing has been modified")
    ]), style=style)
else:
    changes = []
    for key in config.keys():
        if key in old_config.keys():
            if config[key] != old_config[key]:
                changes.append(["m", f"{key}: {old_config[key]} → {config[key]}"])
        else:
            changes.append(["a", f"{key}: {config[key]}"])
    for key in old_config.keys():
        if key not in config.keys():
            changes.append(["d", f"{key}: {old_config[key]}"])

    printing_strings = [("class:success", f"MergeConfig : {config_file} successfully modified.\n")]
    printing_strings += [
        (f"class:{line[0]}", f"              [{line[0]}] {line[1]}" + ('\n' if i != len(changes) - 1 else '')) for i, line in enumerate(changes)
    ]
    print_formatted_text(FormattedText(printing_strings), style=style)