## Basic UI for HF.

## Requirements

## Installation

### CouchApp Configuration

Create a file called: .couchapprc with the following content:

    {
      "env": {
        "default": {
          "db": "http://<user>:<passwd>@localhost:5984/hf"
        },
        "production": {
          "db": "http://<user:<passwd>@<prodServer>:5984/hf"
        }
      }
    }

Replace the values in angle brackets to match your configuration.

