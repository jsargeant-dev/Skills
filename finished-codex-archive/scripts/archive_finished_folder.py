#!/usr/bin/env python3
"""Move a completed Codex folder into Shared Codex Files."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


DEST_ROOT = Path("/Users/jsargeant/Documents/Shared Codex Files")


def unique_destination(source: Path) -> Path:
    candidate = DEST_ROOT / source.name
    if not candidate.exists():
        return candidate

    for index in range(2, 1000):
        candidate = DEST_ROOT / f"{source.name}-archived-{index}"
        if not candidate.exists():
            return candidate

    raise RuntimeError(f"Could not find a unique destination for {source.name!r}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", help="Completed Codex folder to archive")
    args = parser.parse_args()

    source = Path(args.source).expanduser().resolve()
    if not source.exists():
        raise SystemExit(f"Source folder does not exist: {source}")
    if not source.is_dir():
        raise SystemExit(f"Source must be a folder: {source}")

    DEST_ROOT.mkdir(parents=True, exist_ok=True)
    destination = unique_destination(source)
    shutil.move(str(source), str(destination))
    print(destination)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
