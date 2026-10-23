#!/bin/bash
if ! which -- "${1}"; then
  # first arg is not an executable
  if [ -e /tmp/.X99-lock ]; then rm /tmp/.X99-lock -f; fi
  export DISPLAY=:99
  # Filter out harmless xkbcomp keysym warnings (high keycodes for Wayland not supported in X11)
  # -noreset keeps Xvfb up when a SIGHUP reload closes the last renderer, so new renderers can connect at once
  Xvfb "${DISPLAY}" -nolisten unix -noreset 2> >(grep -vE "(Could not resolve keysym|XKEYBOARD keymap compiler|xkbcomp are not fatal)" >&2) &
  exec node /usr/src/app/ "$@"
fi

exec "$@"
