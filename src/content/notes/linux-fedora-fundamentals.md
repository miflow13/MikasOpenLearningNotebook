---
title: "Linux & Fedora Fundamentals"
description: "Notes from working daily in Linux and troubleshooting my own machines."
topic: "Linux & Fedora"
order: 4
featured: false
draft: false
---

Notes from working daily in Linux and troubleshooting my own machines.

## The terminal is a way to inspect state

The shell is not only for running commands. It is one of the best ways to ask the operating system what is actually happening.

Useful categories:

- files and directories
- running processes
- hardware
- drivers
- networking
- logs
- packages
- permissions

## Basic file navigation

Common commands:

```bash
pwd
ls
cd
cp
mv
rm
mkdir
find
```

The important habit is to check where I am before doing destructive work.

## Permissions

Linux permissions determine who can read, write, or execute a file.

Useful tools:

```bash
ls -l
chmod
chown
```

`sudo` should be used deliberately because it runs a command with elevated privileges.

## Fedora package management

Fedora uses `dnf` for system packages.

Examples:

```bash
sudo dnf install PACKAGE
sudo dnf upgrade
sudo dnf remove PACKAGE
```

System libraries such as GTK and PyGObject are often better installed through the distro package manager than through a Python virtual environment.

## Hardware inspection

Linux exposes a lot of hardware information directly.

Examples I have used:

```bash
lspci
lsusb
iw list
```

`lspci -nnk` is especially useful because it shows both the hardware and the kernel driver currently bound to it.

A key lesson: software configuration cannot enable a hardware capability the device does not support. For example, checking supported Wi-Fi frequencies is more useful than trying random NetworkManager settings.

## `/sys` is live kernel/device information

Linux exposes device properties through virtual files under `/sys`.

For a battery, files under:

```text
/sys/class/power_supply/
```

can expose charge state, design capacity, current capacity, cycle count, and voltage.

This taught me that many Linux troubleshooting tasks are really about reading the kernel's current view of a device.

## Drivers and kernel modules

A device usually needs a kernel driver/module.

The useful question is not only "what hardware do I have?" but also:

> What driver is currently in use?

That distinction helps separate hardware limitations from driver/configuration problems.

## GNOME, GTK and Wayland

Desktop Linux is layered:

```text
application
→ toolkit (GTK)
→ desktop/compositor (GNOME / Mutter)
→ Wayland or X11/XWayland
→ kernel / hardware
```

Understanding which layer owns a problem prevents random fixes.

## Generated/cache files

Build directories, `__pycache__`, egg metadata, and temporary outputs are usually reproducible artifacts, not source.

Good cleanup means knowing the difference between:

- source files
- configuration
- runtime assets
- generated artifacts

Deleting things without classifying them first can destroy useful work.

## Main lesson

Linux troubleshooting gets much easier when I stop treating the machine like a black box and instead inspect the exact layer involved: hardware, kernel driver, package, toolkit, compositor, or application.
