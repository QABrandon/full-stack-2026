#!/usr/bin/env bash
# Run from cron every 30 minutes (minute 0 and 30). Uses America/New_York.
set -euo pipefail

export TZ="${TZ:-America/New_York}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

log() {
  if [[ -n "${FS12_SYNC_LOG:-}" ]]; then
    echo "$(date -Iseconds) $*" >>"$FS12_SYNC_LOG"
  else
    echo "$(date -Iseconds) $*"
  fi
}

# Tuesday: from 2026-04-07; Thursday: from 2026-04-02; through 2026-07-16.
# 18:00–22:00 at :00 and :30 (America/New_York).
tue_start="2026-04-07"
thu_start="2026-04-02"
tue_thu_end="2026-07-16"
# Saturday window: 2026-04-04 through 2026-07-18, 13:00–17:00 at :00 and :30
sat_start="2026-04-04"
sat_end="2026-07-18"

d="$(date +%Y-%m-%d)"
wd="$(date +%u)" # 1=Mon … 7=Sun
hm="$(date +%H%M)"
minute="$(date +%M)"

# Cron should fire at :00 and :30 only; skip other minutes if invoked otherwise
if [[ "$minute" != "00" && "$minute" != "30" ]]; then
  log "skip: not on :00 or :30 (minute=$minute)"
  exit 0
fi

in_slot_tue_thu() {
  [[ "$d" > "$tue_thu_end" ]] && return 1
  if [[ "$wd" == "2" ]]; then
    [[ "$d" < "$tue_start" ]] && return 1
  elif [[ "$wd" == "4" ]]; then
    [[ "$d" < "$thu_start" ]] && return 1
  else
    return 1
  fi
  [[ "$hm" == "1800" || "$hm" == "1830" || "$hm" == "1900" || "$hm" == "1930" \
    || "$hm" == "2000" || "$hm" == "2030" || "$hm" == "2100" || "$hm" == "2130" \
    || "$hm" == "2200" ]]
}

in_slot_sat() {
  [[ "$wd" == "6" ]] || return 1
  [[ "$d" < "$sat_start" ]] && return 1
  [[ "$d" > "$sat_end" ]] && return 1
  [[ "$hm" == "1300" || "$hm" == "1330" || "$hm" == "1400" || "$hm" == "1430" \
    || "$hm" == "1500" || "$hm" == "1530" || "$hm" == "1600" || "$hm" == "1630" \
    || "$hm" == "1700" ]]
}

if in_slot_tue_thu; then
  log "scheduled pull: Tue/Thu window"
elif in_slot_sat; then
  log "scheduled pull: Saturday window"
else
  log "skip: outside schedule (d=$d wd=$wd hm=$hm)"
  exit 0
fi

cd "$REPO_ROOT"
if ! "$SCRIPT_DIR/pull-cohort.sh"; then
  log "pull-cohort.sh failed with exit $?"
  exit 1
fi

if [[ "${AUTO_PUSH_ORIGIN:-0}" == "1" ]]; then
  git push origin main || log "git push origin main failed"
fi

log "cohort sync finished"
