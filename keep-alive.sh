#!/bin/bash
# Ping Supabase every few days to prevent free-tier pause (7-day inactivity limit)
curl -s -o /dev/null -w "Supabase ping: HTTP %{http_code} at $(date)\n" \
  "https://ljsquznxqhfcegmquzbe.supabase.co/rest/v1/profiles?select=count&limit=1" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqc3F1em54cWhmY2VnbXF1emJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzM3ODQsImV4cCI6MjA4ODY0OTc4NH0.zNhRTr5T_DEvPzz12aaZXf3aNtS6i8AGbE6fahyemYg"
