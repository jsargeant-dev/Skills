---
name: finished-codex-archive
description: Archive completed Codex thread or project folders into /Users/jsargeant/Documents/Shared Codex Files when the user says a project is done, finished, ready to archive, or asks to move associated files out of active Codex workspaces.
metadata:
  short-description: Archive finished Codex folders
---

# Finished Codex Archive

Use this skill when the user says a Codex project/thread is finished, done, approved, complete, ready to archive, or asks to move associated files into Shared Codex Files.

## Destination

Archive finished folders into:

`/Users/jsargeant/Documents/Shared Codex Files`

This folder is only a repository for finished Codex folders. Do not use it as the working location for active project files unless the user explicitly asks.

## Workflow

1. Identify the folder or folders associated with the finished work.
   - Prefer the current thread folder if it is clear from context.
   - If the folder is ambiguous, inspect likely project folders with targeted `ls` or `find` commands.
   - Ask before moving anything if multiple plausible folders exist.
2. Before moving, check whether the destination already contains a folder with the same name.
   - If a name conflict exists, add a short suffix such as `-archived` or ask the user if the distinction matters.
3. Move the entire finished folder into Shared Codex Files.
   - Preserve folder contents and internal structure.
   - Do not split files across multiple destinations.
   - Do not delete source folders except as part of the move operation.
4. Verify the folder exists in Shared Codex Files after the move.
5. Report the archived folder path and mention any folders that were intentionally left untouched.

## Helper Script

For deterministic moves, use:

```bash
python3 /Users/jsargeant/.codex/skills/finished-codex-archive/scripts/archive_finished_folder.py SOURCE_FOLDER
```

The script moves `SOURCE_FOLDER` into Shared Codex Files, avoids overwriting existing folders, and prints the final destination path.

## Safety

- Never move unrelated folders just because they share a date or client name.
- Never flatten, rename, or reorganize contents unless the user asks.
- If a folder is still being actively edited in the current turn, finish the work first and archive only after verification is complete.
- If moving from outside the sandbox requires approval, request it directly with a concise justification.
