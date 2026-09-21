---
title: "Filesystem-Backed Apps: Paths, Files & Safe Exploration"
description: "Lessons from treating a real home directory as application data while keeping navigation, reading, permissions, and scale under control."
topic: "Linux & Fedora"
order: 24
featured: false
draft: false
---

## A filesystem can be a data source

A normal file manager presents the filesystem as folders and rows.

But the same data can drive a completely different interface.

For example:

~~~text
directory
→ world/region

subdirectory
→ connected area

file
→ object

path relationship
→ spatial connection
~~~

The visual metaphor can change completely while the underlying source of truth remains the filesystem.

## Paths are identity

When representing files visually, the display name is not enough.

Two files can share the same name:

~~~text
/home/mika/project-a/README.md
/home/mika/project-b/README.md
~~~

The full path is the real identity.

That means internal state should usually store the canonical path and derive the friendly label separately.

## Read-only should be the default

If an experimental interface is exploring a real home directory, accidental mutation is dangerous.

A safe early architecture is:

~~~text
discover
→ inspect metadata
→ read supported files
→ visualize

not:

discover
→ rename/delete/move automatically
~~~

Mutation can be added later behind explicit actions and confirmation.

Exploration and file management do not need to be the same feature.

## File types need different treatment

A "file" is not one thing.

Examples:

- plain text
- source code
- image
- audio
- archive
- binary executable
- device/socket
- symlink

Trying to open everything as text will eventually fail.

A viewer needs a type-aware boundary:

~~~text
detect type
→ choose safe preview
→ limit size
→ fall back to metadata
~~~

## Size limits matter

Reading an entire small Markdown file is easy.

Reading a multi-gigabyte file is not.

A safe preview system should use limits such as:

- maximum bytes read
- line limit
- lazy loading
- truncated previews
- binary detection

The UI should not freeze because the user walked near one enormous file.

## Directories should load lazily

A home directory can contain huge trees.

Building the entire world recursively at startup is wasteful.

A better approach is:

~~~text
load current directory
→ show immediate children
→ enter another directory
→ load that directory when needed
~~~

This mirrors how many real file browsers avoid scanning every descendant immediately.

## Permissions are part of the model

A path can exist but still be unreadable.

That is not necessarily an application error.

The filesystem can legitimately respond with:

~~~text
permission denied
file disappeared
symlink target missing
path changed
~~~

Those need to become normal UI states rather than crashes.

## Symlinks can create loops

Recursive traversal must treat symbolic links carefully.

A directory graph is not guaranteed to be a simple tree.

~~~text
A → B
B → A
~~~

Following symlinks blindly can cause repeated traversal or recursion loops.

A traversal system should either avoid following directory symlinks or track visited canonical paths/inodes.

## The visual world should not become the source of truth

If the application represents files as platforms or objects, the visual coordinates are presentation state.

The filesystem remains authoritative.

~~~text
filesystem path
→ data model
→ generated visual placement
~~~

Not:

~~~text
visual object position
→ assumed filesystem truth
~~~

This separation makes refreshes and navigation safer.

## Main lesson

Using the filesystem as the world model is less about graphics than about respecting real operating-system semantics.

The interesting interface can be imaginative, but the data layer still needs boring rules for paths, permissions, file types, limits, symlinks, and errors.

## Next time

For any filesystem-backed interface, define:

~~~text
root boundary:
read-only or writable:
supported preview types:
max preview size:
symlink policy:
permission-error behavior:
lazy-loading strategy:
refresh behavior:
canonical path representation:
~~~

The more experimental the interface becomes, the more important those boring boundaries are.
