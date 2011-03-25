## Basic UI for HF.

## Requirements

* CouchDB version 1.0.1 or 1.0.2
  * Installers for Linux, Apple, and others: http://wiki.apache.org/couchdb/Installation
  * Installer for Windows: http://wiki.apache.org/couchdb/Windows_binary_installer?action=show&redirect=Windows+binary+installer
* CouchApp version 0.7.5
  * Installers for Linux, Apple, and others: http://couchapp.org/page/installing
  * Installer for Windows: https://github.com/downloads/couchapp/couchapp/couchapp-0.7.5.exe

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

